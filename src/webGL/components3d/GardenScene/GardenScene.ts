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
const ENTRY_MARGIN = 0.3

let cameraPathDuration = 0
let cameraLoopNumber = 0
let scrolling = 0
let closeElement: Component3d = null

let introFrameCount

// const stats = Stats()

// =========================== Init =========================== //
gardenScene.onInit = (scene) => {
  localStorage.setItem('intro', 'false')

  // document.body.appendChild(stats.dom)
  const appManager = AppManager.getInstance()
  gardenScene.statesDictionnary['introPlayed'] = false
  // ============= GLTF Loading ============= //
  const gltfMap: Map<string, GLTF> = loadingManager.getFromList(
    gardenScene.expectedObjects
  )

  scene.assignLoadedSceneObjects(gltfMap)

  const gardenBase = scene.getObject('garden_base')
  const portalGLTF = portalComponent3d.getObject('portal_space')
  const gardenBaseModel = gardenBase.getModel()

  scene.sceneBase.add(gardenBaseModel)

  gardenScene.assignPoints()

  MaterialHelper.disableLights(gardenScene.sceneBase)

  // ============= component3d snapping to scene ============= //

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
    })
  })
  console.log('gardenBase', gardenBase)

  // ============= CAMERA ============= //

  cameraTest = gardenBaseModel.getObjectByName(
    'Caméra_Orientation'
  ) as PerspectiveCamera

  cameraEntry = gardenBaseModel.getObjectByName(
    'Caméra001_Orientation'
  ) as PerspectiveCamera

  cameraTest.zoom = 0.93
  cameraEntry.zoom = 0.93

  appManager.camera = cameraTest
  appManager.onWindowResize()

  //ANIMATION MIXERs
  mixerCam = new AnimationMixer(gardenBaseModel)
  mixerEntryCam = new AnimationMixer(gardenBaseModel)
  mixerPortal = new AnimationMixer(portalComponent3d.root)

  // ANIMATIONS
  const clipsPortal = (portalGLTF as GLTFObject).GLTF.animations
  const clipsCam = (gardenBase as GLTFObject).GLTF.animations

  // CLIPS
  const clip: AnimationClip = AnimationClip.findByName(clipsCam, 'CaméraAction')
  const entrPathClip: AnimationClip = AnimationClip.findByName(
    clipsCam,
    'Caméra.001Action'
  )
  const portalClip: AnimationClip = AnimationClip.findByName(
    clipsPortal,
    'Cube.052Action'
  )

  // ACTIONS
  const action: AnimationAction = mixerCam.clipAction(clip)
  const entryAction: AnimationAction = mixerEntryCam.clipAction(entrPathClip)
  const portalAction: AnimationAction = mixerPortal.clipAction(portalClip)

  action.loop = LoopRepeat
  action.zeroSlopeAtEnd = false
  action.zeroSlopeAtStart = false
  action.play()

  entryAction.loop = LoopOnce
  entryAction.clampWhenFinished = true

  cameraPathDuration = clip.duration

  portalAction.loop = LoopOnce

  //========== ENTRY ===========//
  SpaceEntryService.gardenEntrySignal.on(() => {
    introFrameCount = 0
    entryAction.play()
    portalAction.play()
    mixerPortal.setTime(0.8)

    console.log('pazpeapzepazep')
    gardenScene.statesDictionnary['introPlayed'] = 'shallPlay'
  })
}

// =========================== Events =========================== //
ScrollService.signal.on((e) => {
  scrolling = e !== null ? e.deltaY : 0
})

// RoutingCameraService.signal.on((routingData) => {
//   gardenScene.statesDictionnary['introPlayed'] = true

//   console.log('routting triggered')

//   if (routingData.name !== 'continue') {
//     const animationTime = {
//       value: mixerCam.time,
//     }
//     gsap
//       .to(animationTime, {
//         value:
//           cameraLoopNumber * cameraPathDuration + routingData.corespondingTime,
//         onUpdate: (tween) => {
//           console.log('tween', tween)
//           mixerCam.setTime(animationTime.value)
//         },
//         ease: 'power1.inOut',
//         duration: 2.5,
//       })
//       .then(() => {
//         const component = gardenScene.components.find(
//           (comp) => comp.name === routingData.name
//         )
//         if (component) {
//           component.poiArray.forEach((poi) => {
//             const children = poi.css2dObject.element.querySelectorAll('.poi')
//             children.forEach((child) => {
//               ;(child as HTMLElement).style.display = 'block'
//             })
//             // component.root.add(poi.css2dObject)
//           })
//         }
//       })
//   }
// })

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

// =========================== Animation loop =========================== //
let introState = 'false'
let positionState = '0'

gardenScene.onAnimationLoop = (ellapsedTime) => {
  const appManager = AppManager.getInstance()

  if (localStorage.getItem('position') != positionState) {
    const newPositionState = localStorage.getItem('position')
    positionState = newPositionState
    mixerCam.setTime(parseFloat(newPositionState))
    gardenScene.statesDictionnary['introPlayed'] = true
  }

  if (localStorage.getItem('intro') != introState) {
    const newIntroState = localStorage.getItem('intro')
    appManager.camera = newIntroState === 'running' ? cameraEntry : cameraTest
    if (newIntroState === 'running') {
      SpaceEntryService.shallPlayIntro(true)
    }
    appManager.onWindowResize()
    introState = newIntroState
  }
  // console.log("updatin' like crazy")
  introFrameCount++
  // stats.update()

  //mixer Update
  mixerEntryCam.update((1 / 60) * 0.8)
  mixerPortal.update(1 / 60)

  const camLoop = Math.floor(mixerCam.time / cameraPathDuration)
  if (camLoop != cameraLoopNumber) {
    cameraLoopNumber = camLoop
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
    localStorage.setItem('intro', 'false')
    localStorage.setItem('lockScroll', 'false')
  }

  if (
    // gardenScene.statesDictionnary['introPlayed'] &&
    localStorage.getItem('lockScroll') == 'false'
  ) {
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
          ENTRY_MARGIN &&
      mixerCam.time <
        cameraLoopNumber * cameraPathDuration +
          RoutingCameraService.cameraTimedPositions[element.component.name] +
          ENTRY_MARGIN
    ) {
      notCloseToAnyThing = false
      if (element.component != closeElement) {
        closeElement = element.component
        notCloseToAnyThing = false
        SpaceEntryService.setNearElement(element.component.name)
        const component = gardenScene.components.find(
          (comp) => comp.name === element.component.name
        )
        if (component) {
          component.poiArray.forEach((poi) => {
            const children = poi.css2dObject.element.querySelectorAll('.poi')
            children.forEach((child) => {
              ;(child as HTMLElement).style.display = 'flex'
            })
            // component.root.add(poi.css2dObject)
          })
        }
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
