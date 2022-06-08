import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'

import { GLTF } from 'three-stdlib'

import { LoadingManager } from '../../webGLArchitecture/Classes/LoadingManager/LoadingManager'
import { PortalGraphConstruction } from './Portal.graphConstruction'
import { PortalInitialization } from './Portal.initialization'

const loadingManager = LoadingManager.getInstance()

export const portalComponent3d = new Component3d()
portalComponent3d.name = 'portal'
portalComponent3d.placeHolderName = 'Portal'
portalComponent3d.expectedObjects = ['portal_space']

portalComponent3d.onInit = () => {
  const gltfMap: Map<string, GLTF> = loadingManager.getFromList(
    portalComponent3d.expectedObjects
  )

  portalComponent3d.assignLoadedSceneObjects(gltfMap)
  const portalModel = portalComponent3d.getObject('portal_space')

  // const light = new AmbientLight(0x404040) // soft white light
  // portalComponent3d.root.add(light)
  portalComponent3d.root.add(portalModel.getModel())
  // portalComponent3d.root.position.set(6, 0, 6)
  console.log('cegetableGardenComponent initialized', portalModel)
  PortalGraphConstruction(portalComponent3d)
  PortalInitialization(portalComponent3d)
}
