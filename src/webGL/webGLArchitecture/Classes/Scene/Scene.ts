import { CatmullRomCurve3, Object3D, Vector3 } from 'three'
import { IObject3DWrapper } from '../../Interfaces/IObject3DWrapper'
import { IUpdatable } from '../../Interfaces/IUpdatable'
import { Component3d } from '../Compoment3d/Component3d'
import { GLTFObject } from '../GLTFObject/GLTFObject'
import { Geometry, GLTF } from 'three-stdlib'

export class Scene implements IUpdatable {
  sceneBase: Object3D = new Object3D()
  components: Component3d[] = []
  cameraPath: CatmullRomCurve3
  entryPoints: { object: Object3D; component: Component3d }[] = []
  // Component3d objects
  expectedObjects: string[] = []
  loadedSceneObjects: Map<string, IObject3DWrapper> = new Map<
    string,
    IObject3DWrapper
  >()

  onAnimationLoop: (ellapsedTime) => void

  onInit: ((scene: Scene) => void) | undefined

  init() {
    this.components.sort((a: Component3d, b: Component3d) => {
      if (a.index && b.index) {
        return a.index - b.index
      }
      return -1
    })
    for (let i = 0; i < this.components.length; i++) {
      const component3d = this.components[i]
      if (component3d.onInit) {
        component3d.onInit(component3d)
      }
      this.sceneBase.add(component3d.root)
    }
    this.onInit(this)
  }

  /**
   * get a THREE.js object directly by it's Playlet's scene graph
   *
   * @param name - the name of the wanted object 
   *
   * @public
   */
  getObjectFromGraph(modelName: string): Object3D {
    try {
      return this.sceneBase.getObjectByName(modelName)!
    } catch (error) {
      throw Error('Model not available')
    }
  }

  getObject(modelName: string): IObject3DWrapper {
    try {
      return this.loadedSceneObjects.get(modelName)!
    } catch (error) {
      throw Error('Model not available')
    }
  }

  /**
   * add all needed loaded GLTF to the scene loaded objects array,
   * if the name of a gltf is included in the playlet's expectedObjects, it will be added to the playlet's loadedObjects
   *
   * @param gltfSourceMap - a Map of named GLTF
   *
   * @public
   */
  assignLoadedSceneObjects(gltfSourceMap: Map<string, GLTF>): void {
    this.expectedObjects.forEach((expectedObjectName) => {
      const object = gltfSourceMap.get(expectedObjectName)
      if (object) {
        let newModelObject = new GLTFObject(expectedObjectName, object)
        this.loadedSceneObjects.set(expectedObjectName, newModelObject)
      }
    })
  }

  update(elapsedTime: number): void {
    if (this.onAnimationLoop) {
      this.onAnimationLoop(elapsedTime)
    }
    for (let i = 0; i < this.components.length; i++) {
      const component3d = this.components[i]
      if (component3d.onInit) {
        component3d.update(elapsedTime)
      }
    }
  }

  getComponentsPathPoints(): Vector3[] {
    const pathPoints: Vector3[] = []
    for (let i = 0; i < this.components.length; i++) {
      const element = this.components[i]
      pathPoints.push(...element.points)
    }
    return pathPoints
  }

  assignPoints(): Object3D[] {
    const camPoints = []
    this.sceneBase.traverse((obj) => {
      if (
        obj.name.includes('cameraPathPoint') ||
        obj.name.includes('entryPersoPoint')
      ) {
        camPoints.push(obj)
      }
    })

    for (let i = 0; i < this.components.length; i++) {
      const element = this.components[i]
      element.root.traverse((obj) => {
        if (obj.name.includes('entryPersoPoint')) {
          this.entryPoints.push({ object: obj, component: element })
        }
      })
    }
    return camPoints
  }
}
