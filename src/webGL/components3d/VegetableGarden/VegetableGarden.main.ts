import { GLTF } from 'three-stdlib'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'
import { LoadingManager } from '../../webGLArchitecture/Classes/LoadingManager/LoadingManager'
import { VegetableGardenGraphConstruction } from './VegetableGarden.graphContruction'
import { VegetableGardenInitialization } from './VegetableGarden.initialization'

const loadingManager = LoadingManager.getInstance()

export const vegetableGardenComponent3d = new Component3d()

vegetableGardenComponent3d.name = 'vegetable_garden'
vegetableGardenComponent3d.placeHolderName = 'Potager'

vegetableGardenComponent3d.expectedObjects = ['potager_space']

vegetableGardenComponent3d.onInit = () => {
  const gltfMap: Map<string, GLTF> = loadingManager.getFromList(
    vegetableGardenComponent3d.expectedObjects
  )

  vegetableGardenComponent3d.assignLoadedSceneObjects(gltfMap)
  const pocHouse = vegetableGardenComponent3d.getObject('potager_space')
  const tsetCrve = vegetableGardenComponent3d.getObjectFromGraph('CourbeBézier')

  // const light = new AmbientLight(0x404040) // soft white light
  // vegetableGardenComponent3d.root.add(light)

  const garden = pocHouse.getModel()
  vegetableGardenComponent3d.root.add(garden)
  VegetableGardenGraphConstruction(vegetableGardenComponent3d)
  VegetableGardenInitialization(vegetableGardenComponent3d)
}
