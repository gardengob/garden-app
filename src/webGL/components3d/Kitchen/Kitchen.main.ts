import { AmbientLight, Vector3 } from 'three'
import { GLTF } from 'three-stdlib'
import { AppManager } from '../../webGLArchitecture/Classes/AppManager/AppManager'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'
import { LoadingManager } from '../../webGLArchitecture/Classes/LoadingManager/LoadingManager'
import { KitchenGraphConstruction } from './Kitchen.graphConstruction'
import { KitchenInitialization } from './Kitchen.intialization'

const loadingManager = LoadingManager.getInstance()

export const kitchenComponent3d = new Component3d()
kitchenComponent3d.name = 'kitchen'
kitchenComponent3d.placeHolderName = 'Cuisine'
kitchenComponent3d.index = 3
kitchenComponent3d.cameraLookAtTarget.position.set(0, 1, 0)
kitchenComponent3d.expectedObjects = []

kitchenComponent3d.expectedObjects = ['kitchen_space']

kitchenComponent3d.onInit = () => {
  const gltfMap: Map<string, GLTF> = loadingManager.getFromList(
    kitchenComponent3d.expectedObjects
  )

  kitchenComponent3d.assignLoadedSceneObjects(gltfMap)
  const space = kitchenComponent3d.getObject('kitchen_space')

  //   const light = new AmbientLight(0x404040) // soft white light
  //   kitchenComponent3d.root.add(light)
  kitchenComponent3d.root.add(space.getModel())
}

KitchenGraphConstruction(kitchenComponent3d)
KitchenInitialization(kitchenComponent3d)
