import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'
import { ContestGraphConstruction } from './Contest.graphConstruction'
import { ContestInitialization } from './Contest.intialization'

import { GLTF } from 'three-stdlib'

import { LoadingManager } from '../../webGLArchitecture/Classes/LoadingManager/LoadingManager'
import { Object3D } from 'three'
import { AppManager } from '../../webGLArchitecture/Classes/AppManager/AppManager'
import WebglService from '../../../services/events/WebglService'

const loadingManager = LoadingManager.getInstance()

export const contestComponent3d = new Component3d()
contestComponent3d.name = 'contest'
contestComponent3d.placeHolderName = 'Table'
contestComponent3d.expectedObjects = ['table_space']

contestComponent3d.onInit = () => {
  const gltfMap: Map<string, GLTF> = loadingManager.getFromList(
    contestComponent3d.expectedObjects
  )

  // contestComponent3d.root.getWorldPosition(rootWorldPos)

  contestComponent3d.assignLoadedSceneObjects(gltfMap)
  const table = contestComponent3d.getObject('table_space')

  // const light = new AmbientLight(0x404040) // soft white light
  // contestComponent3d.root.add(light)
  const tableModel = table.getModel()
  contestComponent3d.root.add(tableModel)
  console.log('tableModel', tableModel)
  const pizza = tableModel.getObjectByName('center')
  const quenelles = tableModel.getObjectByName('plat')
  contestComponent3d.poiArray.push(
    {
      onclick: () => {
        console.log('contest')
        WebglService.ActivatePOI('contest')
      },
      holder: pizza,
    },
    {
      onclick: () => {
        console.log('guess')
      },
      holder: quenelles,
    }
  )

  contestComponent3d.drawPOIs()
  // contestComponent3d.root.position.set(6, 0, 6)
  // console.log('cegetableGardenComponent initialized')
  ContestGraphConstruction(contestComponent3d)
  ContestInitialization(contestComponent3d)
}
