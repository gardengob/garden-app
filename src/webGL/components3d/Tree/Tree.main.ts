import { Object3D, Vector3 } from 'three'
import { GLTF } from 'three-stdlib'
import { AmbientLight } from 'three/src/lights/AmbientLight'
import { AppManager } from '../../webGLArchitecture/Classes/AppManager/AppManager'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'
import { LoadingManager } from '../../webGLArchitecture/Classes/LoadingManager/LoadingManager'
import { TreeGraphConstruction } from './Tree.graphConstruction'
import { TreeInitialization } from './Tree.initialization'

const loadingManager = LoadingManager.getInstance()

export const treeComponent3d = new Component3d()
treeComponent3d.root.position.set(2, 0, 2)
treeComponent3d.name = 'tree'
treeComponent3d.placeHolderName = 'Arbre'

treeComponent3d.expectedObjects = ['tree_space']

treeComponent3d.onInit = () => {
  const gltfMap: Map<string, GLTF> = loadingManager.getFromList(
    treeComponent3d.expectedObjects
  )

  const appManager = AppManager.getInstance()

  const treePOIHolder = new Object3D()

  treePOIHolder.position.y = 4
  treePOIHolder.position.x = 0
  treePOIHolder.position.z = 0

  treeComponent3d.root.add(treePOIHolder)

  // treeComponent3d.root.getWorldPosition(rootWorldPos)

  treeComponent3d.poiArray.push({
    onclick: () => {
      console.log('tree')
    },
    holder: treePOIHolder,
  })

  treeComponent3d.drawPOIs()

  treeComponent3d.assignLoadedSceneObjects(gltfMap)
  const pocHouse = treeComponent3d.getObject('tree_space')

  //   const light = new AmbientLight(0x404040) // soft white light
  //   treeComponent3d.root.add(light)
  treeComponent3d.root.add(pocHouse.getModel())
  // treeComponent3d.root.position.set(6, 0, 1)

  TreeGraphConstruction(treeComponent3d)
  TreeInitialization(treeComponent3d)
}
