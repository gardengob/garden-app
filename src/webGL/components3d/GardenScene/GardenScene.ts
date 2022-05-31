import {
  MeshBasicMaterial,
  Mesh,
  Vector3,
  BoxGeometry,
  AnimationMixer,
  AnimationClip,
  CameraHelper,
  PerspectiveCamera,
  Camera,
  LoopRepeat,
  AmbientLight,
  AnimationAction,
} from 'three'
import { AppManager } from '../../webGLArchitecture/Classes/AppManager/AppManager'
import { Scene } from '../../webGLArchitecture/Classes/Scene/Scene'
import { kitchenComponent3d } from '../Kitchen/Kitchen.main'
import { mailboxComponent3d } from '../MailBox/MailBox.main'
import { treeComponent3d } from '../Tree/Tree.main'
import { vegetableGardenComponent3d } from '../VegetableGarden/VegetableGarden.main'
import { contestComponent3d } from '../Contest/Contest.main'
import { LoadingManager } from '../../webGLArchitecture/Classes/LoadingManager/LoadingManager'
import { GLTF } from 'three-stdlib'
import { memoryComponent3d } from '../Memories/Memory.main'
import { MaterialHelper } from '../../webGLArchitecture/Utils/MaterialHelper'
import SpaceEntryService from '../../../services/events/SpaceEntryService'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'
import { GLTFObject } from '../../webGLArchitecture/Classes/GLTFObject/GLTFObject'
import ScrollService from '../../../services/events/ScrollService'
import RoutingCameraService from '../../../services/events/RoutingCameraService'
import gsap from 'gsap'
import { portalComponent3d } from '../Portal/Portal.main'
export const gardenScene = new Scene()
const loadingManager = LoadingManager.getInstance()

gardenScene.expectedObjects = ['garden_base', 'base_fake_elements3']

gardenScene.components.push(vegetableGardenComponent3d)
gardenScene.components.push(treeComponent3d)
gardenScene.components.push(kitchenComponent3d)
gardenScene.components.push(mailboxComponent3d)
gardenScene.components.push(contestComponent3d)
gardenScene.components.push(memoryComponent3d)
gardenScene.components.push(portalComponent3d)

MaterialHelper.disableLights(gardenScene.sceneBase)

let cameraTest: PerspectiveCamera
let mixerCam: AnimationMixer
const ANIMATION_SPEED = 1 / 144
const ANIMATION_SPEED_COEF = 1 / 20

let cameraPathDuration = 0
let cameraLoopNumber = 0
let scrolling = 0
let closeElement: Component3d = null

gardenScene.onInit = (scene) => {
  const appManager = AppManager.getInstance()

  const gltfMap: Map<string, GLTF> = loadingManager.getFromList(
    gardenScene.expectedObjects
  )

  scene.assignLoadedSceneObjects(gltfMap)
  const gardenBase = scene.getObject('garden_base')
  // const testBase = scene.getObject('base_fake_elements3')
  // const testBake = scene.getObject('test_bake')

  const clipsCam = (gardenBase as GLTFObject).GLTF.animations

  const gardenBaseModel = gardenBase.getModel()
  // const testBaseModel = testBase.getModel()
  // const testBakeModel = testBake.getModel()

  scene.sceneBase.add(gardenBaseModel)
  // scene.sceneBase.add(testBaseModel)
  // scene.sceneBase.add(testBakeModel)
  // MaterialHelper.disableLights(testBakeModel)
  cameraTest = gardenBaseModel.getObjectByName(
    'Caméra_Orientation'
  ) as PerspectiveCamera
  const helpertest = new CameraHelper(cameraTest as Camera)
  // appManager.scene.add(gardenBaseModel)
  appManager.camera = cameraTest
  appManager.onWindowResize()
  gardenBaseModel.add(helpertest)

  gardenScene.components.forEach((component) => {
    gardenBaseModel.traverse((child) => {
      if (child.name === component.placeHolderName) {
        component.root.position.set(
          child.position.x,
          child.position.y,
          child.position.z
        )
        component.root.rotation.set(
          child.rotation.x,
          child.rotation.y,
          child.rotation.z
        )
      }
      if (child.name === 'Portail') {
        // testBakeModel.position.set(
        //   child.position.x,
        //   child.position.y,
        //   child.position.z
        // )
        // testBakeModel.rotation.set(
        //   child.rotation.x,
        //   child.rotation.y,
        //   child.rotation.z
        // )
      }
    })
  })

  const light = new AmbientLight()
  // appManager.scene.add(light)

  // ANIMATIONS
  mixerCam = new AnimationMixer(gardenBaseModel)
  const clip: AnimationClip = AnimationClip.findByName(clipsCam, 'Action')
  const action: AnimationAction = mixerCam.clipAction(clip)
  action.loop = LoopRepeat
  action.play()
  cameraPathDuration = clip.duration

  gardenScene.assignPoints()
  MaterialHelper.disableLights(gardenScene.sceneBase)
}

ScrollService.signal.on((e) => {
  scrolling = e !== null ? e.deltaY : 0
})

RoutingCameraService.signal.on((time) => {
  const animationTime = {
    value: mixerCam.time,
  }
  gsap.to(animationTime, {
    value: cameraLoopNumber * cameraPathDuration + time,
    onUpdate: (tween) => {
      console.log('tween', tween)
      mixerCam.setTime(animationTime.value)
    },
    ease: 'power1.inOut',
    duration: 2.5,
  })
})

gardenScene.onAnimationLoop = (ellapsedTime) => {
  const appManager = AppManager.getInstance()
  const camLoop = Math.floor(mixerCam.time / cameraPathDuration)
  if (camLoop != cameraLoopNumber) {
    cameraLoopNumber = camLoop
    console.log(cameraLoopNumber)
  }
  if (scrolling < -0.1 || scrolling > 0.1) {
    if (scrolling > 0) {
      mixerCam.update(
        ANIMATION_SPEED *
          ANIMATION_SPEED_COEF *
          ellapsedTime *
          Math.sqrt(scrolling)
      )
    }
    if (scrolling < 0) {
      mixerCam.update(
        -ANIMATION_SPEED *
          ANIMATION_SPEED_COEF *
          ellapsedTime *
          Math.sqrt(Math.abs(scrolling))
      )
    }
  }

  let notCloseToAnyThing = true
  for (let i = 0; i < gardenScene.entryPoints.length; i++) {
    const element = gardenScene.entryPoints[i]

    if (
      mixerCam.time >
        cameraLoopNumber * cameraPathDuration +
          RoutingCameraService.cameraTimedPositions[element.component.name] -
          0.2 &&
      mixerCam.time <
        cameraLoopNumber * cameraPathDuration +
          RoutingCameraService.cameraTimedPositions[element.component.name] +
          0.2
    ) {
      notCloseToAnyThing = false
      if (element.component != closeElement) {
        closeElement = element.component
        notCloseToAnyThing = false
        SpaceEntryService.setNearElement(element.component.name)

        //ACTION : in front of element
      }
    }
  }
  if (notCloseToAnyThing && closeElement !== null) {
    closeElement = null
    SpaceEntryService.setNearElement(null)
    //ACTION : not front of element
  }
}
