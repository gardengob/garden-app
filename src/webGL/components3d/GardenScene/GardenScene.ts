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
  LoopOnce,
  Clock,
  Object3D,
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
import Stats from 'three/examples/jsm/libs/stats.module'
export const gardenScene = new Scene()
const loadingManager = LoadingManager.getInstance()
const STARTING_CAMERA_OFFSET = 4
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
let cameraEntry: PerspectiveCamera
let mixerCam: AnimationMixer
let mixerEntryCam: AnimationMixer
let mixerPortal: AnimationMixer
const ANIMATION_SPEED = 1 / 144
const ANIMATION_SPEED_COEF = 1 / 20 / 2

let cameraPathDuration = 0
let cameraLoopNumber = 0
let scrolling = 0
let closeElement: Component3d = null

let introFrameCount

const stats = Stats()
gardenScene.onInit = (scene) => {
  document.body.appendChild(stats.dom)
  const appManager = AppManager.getInstance()
  gardenScene.statesDictionnary['introPlayed'] = false

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

  cameraEntry = gardenBaseModel.getObjectByName(
    'Caméra001_Orientation'
  ) as PerspectiveCamera

  const worldCameraInitialAnimationPos: Vector3 = new Vector3()
  const helpertest = new CameraHelper(cameraTest as Camera)
  cameraTest.getWorldPosition(worldCameraInitialAnimationPos)
  // cameraTest.rotateOnAxis(new Vector3(0, 0, 1), Math.PI / 2)
  // appManager.scene.add(gardenBaseModel)
  cameraTest.zoom = 0.93
  cameraEntry.zoom = 0.93
  // cameraEntry.rotateY(0.0115)
  // cameraEntry.rotateZ(0.05)
  appManager.camera = cameraEntry
  appManager.onWindowResize()
  // gardenBaseModel.add(helpertest)

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
      // if (child.name === 'Portail') {
      //   testBakeModel.position.set(
      //     child.position.x,
      //     child.position.y,
      //     child.position.z
      //   )
      //   testBakeModel.rotation.set(
      //     child.rotation.x,
      //     child.rotation.y,
      //     child.rotation.z
      //   )
      // }
    })
  })
  const portalGLTF = portalComponent3d.getObject('portal_space')
  // ANIMATIONS"Cube.052Action"
  // CAMERA
  console.log('clipsCam', clipsCam)
  mixerCam = new AnimationMixer(gardenBaseModel)
  mixerEntryCam = new AnimationMixer(gardenBaseModel)
  const clip: AnimationClip = AnimationClip.findByName(clipsCam, 'Action')
  const entrPathClip: AnimationClip = AnimationClip.findByName(
    clipsCam,
    'Action.001'
  )
  const action: AnimationAction = mixerCam.clipAction(clip)
  const entryAction: AnimationAction = mixerEntryCam.clipAction(entrPathClip)
  action.loop = LoopRepeat
  entryAction.loop = LoopOnce

  entryAction.clampWhenFinished = true
  action.play()
  cameraPathDuration = clip.duration
  gardenScene.assignPoints()
  console.log('points', gardenScene.entryPoints)

  const clipsPortal = (portalGLTF as GLTFObject).GLTF.animations
  // PORTAL
  mixerPortal = new AnimationMixer(portalComponent3d.root)
  console.log('portal animations', clipsPortal)
  const portalClip: AnimationClip = AnimationClip.findByName(
    clipsPortal,
    'Cube.052Action'
  )
  const portalAction: AnimationAction = mixerPortal.clipAction(portalClip)
  portalAction.loop = LoopOnce
  // cameraPathDuration = portalClip.duration
  MaterialHelper.disableLights(gardenScene.sceneBase)
  // cameraTest.rotateOnWorldAxis(new Vector3(0, 1, 0), Math.PI)

  // cameraTest.rotateOnWorldAxis(test, Math.PI)
  // const rotation = {
  //   value: 0,
  // }

  //========== ENTRY ===========//
  SpaceEntryService.gardenEntrySignal.on(() => {
    introFrameCount = 0
    entryAction.play()
    portalAction.play()
    mixerPortal.setTime(0.8)

    // const animationFinished = setTimeout(() => {},
    // entrPathClip.duration * mixerEntryCam.timeScale * 300)
    console.log('pazpeapzepazep')
    gardenScene.statesDictionnary['introPlayed'] = 'shallPlay'
  })
}

ScrollService.signal.on((e) => {
  scrolling = e !== null ? e.deltaY : 0
})

RoutingCameraService.signal.on((routingData) => {
  const animationTime = {
    value: mixerCam.time,
  }
  gsap
    .to(animationTime, {
      value:
        cameraLoopNumber * cameraPathDuration + routingData.corespondingTime,
      onUpdate: (tween) => {
        console.log('tween', tween)
        mixerCam.setTime(animationTime.value)
      },
      ease: 'power1.inOut',
      duration: 2.5,
    })
    .then(() => {
      const component = gardenScene.components.find(
        (comp) => comp.name === routingData.name
      )
      if (component) {
        component.poiArray.forEach((poi) => {
          const children = poi.css2dObject.element.querySelectorAll('.poi')
          children.forEach((child) => {
            ;(child as HTMLElement).style.display = 'block'
          })
          // component.root.add(poi.css2dObject)
        })
      }
    })
})

SpaceEntryService.spaceSignal.on((name) => {
  console.log('name', name)
  gardenScene.components.forEach((component) => {
    if (name === null) {
      component.poiArray.forEach((poi) => {
        const children = poi.css2dObject.element.querySelectorAll('.poi')
        children.forEach((child) => {
          ;(child as HTMLElement).style.display = 'none'
        })
        // component.root.add(poi.css2dObject)
      })
    }
  })
})

gardenScene.onAnimationLoop = (ellapsedTime) => {
  introFrameCount++
  stats.update()
  const appManager = AppManager.getInstance()
  mixerEntryCam.update((1 / 60) * 0.8)
  const camLoop = Math.floor(mixerCam.time / cameraPathDuration)
  mixerPortal.update(1 / 60)
  if (camLoop != cameraLoopNumber) {
    cameraLoopNumber = camLoop
    console.log(cameraLoopNumber)
  }

  if (
    introFrameCount >= 310 &&
    gardenScene.statesDictionnary['introPlayed'] === 'shallPlay'
  ) {
    // console.log('finished', entrPathClip.duration)

    mixerCam.setTime(2.793)
    // mixerCam.setTime(2.7935)
    appManager.camera = cameraTest
    appManager.onWindowResize()
    introFrameCount = 0
    gardenScene.statesDictionnary['introPlayed'] = true
  }

  if (gardenScene.statesDictionnary['introPlayed']) {
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
  }

  let notCloseToAnyThing = true
  for (let i = 0; i < gardenScene.entryPoints.length; i++) {
    const element = gardenScene.entryPoints[i]

    if (
      mixerCam.time >
        cameraLoopNumber * cameraPathDuration +
          RoutingCameraService.cameraTimedPositions[element.component.name] -
          0.3 &&
      mixerCam.time <
        cameraLoopNumber * cameraPathDuration +
          RoutingCameraService.cameraTimedPositions[element.component.name] +
          0.3
    ) {
      console.log('found: ', element.component.name)

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
