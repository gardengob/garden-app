import { AppManager } from '../../webGLArchitecture/Classes/AppManager/AppManager'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'
import { ContestGraphConstruction } from './Contest.graphConstruction'
import { ContestInitialization } from './Contest.intialization'
import {
  AmbientLight,
  BoxGeometry,
  BufferGeometry,
  CubicBezierCurve3,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Points,
  PointsMaterial,
  Vector3,
} from 'three'
import { Geometry, GLTF } from 'three-stdlib'

import { LoadingManager } from '../../webGLArchitecture/Classes/LoadingManager/LoadingManager'

const loadingManager = LoadingManager.getInstance()

export const contestComponent3d = new Component3d()
contestComponent3d.cameraLookAtTarget.position.set(0, 1, 0)
contestComponent3d.name = 'contest'
contestComponent3d.index = 6
contestComponent3d.expectedObjects = ['table_space']

contestComponent3d.onInit = () => {
  const gltfMap: Map<string, GLTF> = loadingManager.getFromList(
    contestComponent3d.expectedObjects
  )

  contestComponent3d.assignLoadedSceneObjects(gltfMap)
  const pocHouse = contestComponent3d.getObject('table_space')

  // const light = new AmbientLight(0x404040) // soft white light
  // contestComponent3d.root.add(light)
  contestComponent3d.root.add(pocHouse.getModel())
  contestComponent3d.root.position.set(6, 0, 6)
  // console.log('cegetableGardenComponent initialized')
  ContestGraphConstruction(contestComponent3d)
  ContestInitialization(contestComponent3d)
}
