import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import * as THREE from 'three'
import { treeComponent3d } from '../../webGL/components3d/Tree/Tree.main'
import { vegetableGardenComponent3d } from '../../webGL/components3d/VegetableGarden/VegetableGarden.main'
import { AppManager } from '../../webGL/webGLArchitecture/Classes/AppManager/AppManager'
import { Scene } from '../../webGL/webGLArchitecture/Classes/Scene/Scene'
import { AppStateEnum } from '../../webGL/webGLArchitecture/Enums/AppStateEnum'
import modelsToLoad from '../../../public/datas/modelsLocation.json'

import css from './Garden3d.module.scss'
import { LoadingManager } from '../../webGL/webGLArchitecture/Classes/LoadingManager/LoadingManager'
import { GLTF } from 'three-stdlib/loaders/GLTFLoader'
import { gardenScene } from '../../webGL/components3d/GardenScene/GardenScene'
import SpaceEntryService from '../../services/events/SpaceEntryService'
import { useRouter } from 'next/router'
import Stats from 'three/examples/jsm/libs/stats.module'
import ScrollService from '../../services/events/ScrollService'
import { merge } from '../../utils/arrayUtils'
import LoadingService from '../../services/events/LoadingService'
import RoutingCameraService from '../../services/events/RoutingCameraService'
export interface IWindowSize {
  width: number
  height: number
}

const stats = Stats()

export default function Garden3d({ className }) {
  const canvasRef = useRef(null)
  let time = Date.now()
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: 0,
    height: 0,
  })
  const [elementNear, setElementNear] = useState(null)

  const router = useRouter()

  useEffect(() => {
    console.log('init garden3D')
    const loadingManager = LoadingManager.getInstance()
    const appManager = AppManager.getInstance()

    SpaceEntryService.spaceSignal.on((name) => {
      setElementNear(name)
    })

    let _scrollTimeout = null

    document.addEventListener('mousewheel', (e: WheelEvent) => {
      ScrollService.scrolling(e)

      clearTimeout(_scrollTimeout)
      _scrollTimeout = setTimeout(function () {
        ScrollService.stopped()
      }, 250)
    })

    modelsToLoad.forEach((model) => {
      loadingManager.modelsToLoad.set(model.name, model.path)
    })

    loadingManager.loadAllModels(
      onLoadErrorFunction,
      onLoadingFunction,
      onAllLoadedFunction,
      onModelLoadedFunction
    )

    window.addEventListener('resize', resizeCanvas)

    const scene = new THREE.Scene()

    // Object
    // const geometry = new THREE.BoxGeometry(1, 1, 1)
    // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    // const mesh = new THREE.Mesh(geometry, material)

    // appManager.scene.add(mesh)
    appManager.canvas = canvasRef.current

    const axesHelper = new THREE.AxesHelper(5)
    appManager.scene.add(axesHelper)

    // const helper = new THREE.CameraHelper(appManager.camera)
    // appManager.scene.add(helper)

    appManager.camera.lookAt(new THREE.Vector3(0, 0, 0))

    appManager.devMode = false

    //déso j'en ai eu marre
    resizeCanvas()
    resizeCanvas()

    appManager.appInitializationFunction = () => {
      gardenScene.init()
      appManager.scene.add(gardenScene.sceneBase)
      appManager.objectsToUpdate.push(gardenScene)
    }

    render()
  }, [])

  function render() {
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime
    const appManager = AppManager.getInstance()
    stats.begin()
    // const elapsedTime = appManager.clock.getElapsedTime()
    // const deltaTime = elapsedTime - appManager.oldElapsedTime
    // appManager.oldElapsedTime = elapsedTime

    appManager.update(deltaTime)
    requestAnimationFrame(render)

    stats.end()
  }

  function resizeCanvas() {
    const appManager = AppManager.getInstance()

    appManager.canvas.style.width = '100%'
    appManager.canvas.style.height = '100%'

    appManager.canvas.width = window.innerWidth
    appManager.canvas.height = window.innerHeight

    appManager.onWindowResize()
  }

  function onLoadErrorFunction(error: ErrorEvent): void {}
  function onModelLoadedFunction(gltf: GLTF, loadingPercent: number): void {}
  function onAllLoadedFunction(): void {
    LoadingService.loadingFinished()
    const appManager = AppManager.getInstance()

    appManager.appState = AppStateEnum.INITIALIZING
  }
  function onLoadingFunction(xhr: ProgressEvent<EventTarget>): void {
    console.log(Math.round((xhr.loaded * 100) / xhr.total))
  }

  return (
    <div className={merge([className, css.webgl])}>
      {/* <div>{stats.domElement}</div> */}
      <div
        className="img-holder"
        style={{
          position: 'absolute',
          height: '100vh',
          width: '100vw',
          top: 0,
          left: 0,
        }}
      ></div>
      <div
        className="css-render-target"
        style={{
          position: 'absolute',
          height: '100vh',
          width: '100vw',
          top: 0,
          left: 0,
        }}
      ></div>
      <button
        style={{
          position: 'absolute',
          top: '100px',
        }}
        onClick={() => {
          AppManager.getInstance().devMode = !AppManager.getInstance().devMode
        }}
      >
        devMode
      </button>
      {elementNear && (
        <div
          onClick={() => {
            for (const key in RoutingCameraService.routeSpaceDictionnary) {
              const element = RoutingCameraService.routeSpaceDictionnary[key]
              if (element === elementNear) {
                router.push(key)
              }
            }
          }}
          style={{
            position: 'absolute',
            top: '75%',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            color: 'black',
            backgroundColor: 'white',
            borderRadius: '32px',
          }}
        >
          {elementNear}
        </div>
      )}

      <canvas className={css.canvas} ref={canvasRef} id="canvas" />
    </div>
  )
}
