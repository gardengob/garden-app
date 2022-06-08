import { AppManager } from '../../webGLArchitecture/Classes/AppManager/AppManager'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'
import { MemoryGraphConstruction } from './Memory.graphConstruction'
import { MemoryInitialization } from './Memory.intialization'

import { GLTF } from 'three-stdlib'

import { LoadingManager } from '../../webGLArchitecture/Classes/LoadingManager/LoadingManager'

const loadingManager = LoadingManager.getInstance()

export const memoryComponent3d = new Component3d()
memoryComponent3d.name = 'memories'
memoryComponent3d.placeHolderName = 'Memories'
memoryComponent3d.expectedObjects = ['memories_space']

memoryComponent3d.onInit = () => {
  const gltfMap: Map<string, GLTF> = loadingManager.getFromList(
    memoryComponent3d.expectedObjects
  )

  memoryComponent3d.assignLoadedSceneObjects(gltfMap)
  const pocHouse = memoryComponent3d.getObject('memories_space')

  // const light = new AmbientLight(0x404040) // soft white light
  // memoryComponent3d.root.add(light)
  memoryComponent3d.root.add(pocHouse.getModel())
  MemoryGraphConstruction(memoryComponent3d)
  MemoryInitialization(memoryComponent3d)
}
