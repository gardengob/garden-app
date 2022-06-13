import { AmbientLight, Object3D, Vector3 } from 'three'
import { GLTF } from 'three-stdlib'
import UiService from '../../../services/events/UiService'
import { AppManager } from '../../webGLArchitecture/Classes/AppManager/AppManager'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'
import { LoadingManager } from '../../webGLArchitecture/Classes/LoadingManager/LoadingManager'
import { KitchenGraphConstruction } from './Kitchen.graphConstruction'
import { KitchenInitialization } from './Kitchen.intialization'

const loadingManager = LoadingManager.getInstance()

export const kitchenComponent3d = new Component3d()
kitchenComponent3d.name = 'kitchen'
kitchenComponent3d.placeHolderName = 'Cuisine'
kitchenComponent3d.expectedObjects = []

kitchenComponent3d.expectedObjects = ['kitchen_space']

kitchenComponent3d.onInit = () => {
  const gltfMap: Map<string, GLTF> = loadingManager.getFromList(
    kitchenComponent3d.expectedObjects
  )

  const appManager = AppManager.getInstance()

  const kitchenPOIHolder = new Object3D()

  kitchenPOIHolder.position.y = 1
  kitchenPOIHolder.position.x = -1
  kitchenPOIHolder.position.z = -0.6

  kitchenComponent3d.root.add(kitchenPOIHolder)

  // kitchenComponent3d.root.getWorldPosition(rootWorldPos)

  kitchenComponent3d.poiArray.push({
    onclick: () => {
      UiService.toggleUi(true)
      console.log('kitchen')
    },
    holder: kitchenPOIHolder,
  })

  kitchenComponent3d.drawPOIs()
  kitchenComponent3d.assignLoadedSceneObjects(gltfMap)
  const space = kitchenComponent3d.getObject('kitchen_space')

  //   const light = new AmbientLight(0x404040) // soft white light
  //   kitchenComponent3d.root.add(light)
  kitchenComponent3d.root.add(space.getModel())
}

KitchenGraphConstruction(kitchenComponent3d)
KitchenInitialization(kitchenComponent3d)
