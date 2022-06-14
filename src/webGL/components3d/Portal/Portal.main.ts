import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'

import { GLTF } from 'three-stdlib'

import { LoadingManager } from '../../webGLArchitecture/Classes/LoadingManager/LoadingManager'
import { PortalGraphConstruction } from './Portal.graphConstruction'
import { PortalInitialization } from './Portal.initialization'
import { Object3D } from 'three'
import { AppManager } from '../../webGLArchitecture/Classes/AppManager/AppManager'
import UiService from '../../../services/events/UiService'
import WebglService from '../../../services/events/WebglService'

const loadingManager = LoadingManager.getInstance()

export const portalComponent3d = new Component3d()
portalComponent3d.name = 'portal'
portalComponent3d.placeHolderName = 'Portal'
portalComponent3d.expectedObjects = ['portal_space']

portalComponent3d.onInit = () => {
  const gltfMap: Map<string, GLTF> = loadingManager.getFromList(
    portalComponent3d.expectedObjects
  )

  const appManager = AppManager.getInstance()

  const portalPOIHolder = new Object3D()

  portalPOIHolder.position.y = 0.5
  portalPOIHolder.position.x = 0.04
  portalPOIHolder.position.z = 0

  portalComponent3d.root.add(portalPOIHolder)

  // portalComponent3d.root.getWorldPosition(rootWorldPos)

  portalComponent3d.poiArray.push({
    onclick: () => {
      UiService.toggleUi(true)
      WebglService.ActivatePOI('/')
      WebglService.disable3D()
    },
    holder: portalPOIHolder,
  })

  portalComponent3d.drawPOIs()

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
