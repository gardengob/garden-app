import { DOMElement } from 'react'
import { Object3D, PerspectiveCamera, Vector3 } from 'three'
import { GLTF } from 'three-stdlib/loaders/GLTFLoader'
import { IObject3DWrapper } from '../../Interfaces/IObject3DWrapper'
import { IUpdatable } from '../../Interfaces/IUpdatable'
import { Component3dName } from '../../Types/Component3dNameType'
import { GLTFObject } from '../GLTFObject/GLTFObject'

export enum Component3dStateEnum {
  ONGOING = 'ONGOING',
  GLOBAL_ONGOING = 'GLOBAL_ONGOING',
  IDLE = 'IDLE',
}

export class Component3d implements IUpdatable {
  name: Component3dName
  placeHolderName: string

  root: Object3D = new Object3D()
  position: Vector3

  // Component States
  status: Component3dStateEnum
  statesDictionnary: Map<String, any> = new Map()
  animationFunctions: Map<string, () => void> = new Map<string, () => void>()

  // Component3d objects
  expectedObjects: string[] = []
  loadedSceneObjects: Map<string, IObject3DWrapper> = new Map<
    string,
    IObject3DWrapper
  >()

  showPoi: boolean = true
  poiArray: { htmlElement: HTMLDivElement; position: Vector3 }[] = []

  //closure called on component3d init
  onInit: ((component3d: Component3d) => void) | undefined

  //closure called once per frame
  onAnimationLoop:
    | ((ellapsedTime: number, component3d: Component3d) => void)
    | undefined

  onGlobalAnimationLoop:
    | ((ellapsedTime: number, component3d: Component3d) => void)
    | undefined

  //closure called on component3d's start
  onStart: ((component3d: Component3d) => void) | undefined

  /**
   * get a THREE.js object directly by it's Playlet's scene graph
   *
   * @param name - the name of the wanted object
   *
   * @public
   */
  getObjectFromGraph(modelName: string): Object3D {
    try {
      return this.root.getObjectByName(modelName)!
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

  drawPOIs(camera: PerspectiveCamera, canvas) {
    this.poiArray.forEach((element) => {
      // element.position.project(camera)
      console.log('element.position', element.position)

      // get the position of the center of the cube

      element.position.project(camera)

      // convert the normalized position to CSS coordinates
      const x = (element.position.x * 0.5 + 0.5) * canvas.clientWidth
      const y = (element.position.y * -0.5 + 0.5) * canvas.clientHeight

      console.log('x', x)
      console.log('y', y)

      element.htmlElement.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`
    })
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

  update(ellapsedTime: number) {
    // this.interactionManager.update()
    if (this.status == Component3dStateEnum.ONGOING) {
      if (this.onAnimationLoop) {
        this.onAnimationLoop(ellapsedTime, this)
      }
    } else if (this.status == Component3dStateEnum.GLOBAL_ONGOING) {
      if (this.onGlobalAnimationLoop) {
        this.onGlobalAnimationLoop(ellapsedTime, this)
      }
    }
  }

  toGlobalView(): void {
    this.status = Component3dStateEnum.GLOBAL_ONGOING
  }

  enter(): void {
    this.status = Component3dStateEnum.ONGOING
  }

  stop(): void {
    this.status = Component3dStateEnum.IDLE
  }
}
