import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import * as THREE from 'three'
import { AppManager } from '../../webGL/webGLArchitecture/Classes/AppManager/AppManager'
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
import WebglService from '../../services/events/WebglService'
export interface IWindowSize {
  width: number
  height: number
}

// const stats = Stats()

export default function Garden3d({ className }) {
  const canvasRef = useRef(null)
  let time = Date.now()
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: 0,
    height: 0,
  })
  const [elementNear, setElementNear] = useState(null)
  const [need3D, setneed3D] = useState(true)

  const router = useRouter()

  useEffect(() => {
    WebglService.webGlInitialized = true
    console.log('GARDEN INIIIIIIIIIIIIIIIIIITTTTTTTT')
    WebglService.with3Dsignal.on((with3D) => {
      console.log('got signal')
      setneed3D(with3D)
    })

    WebglService.PoiSignal.on((activePoi) => {
      router.push(activePoi)
    })
  }, [])

  useEffect(() => {
    setneed3D(true)
    console.log('router.query', router.pathname)

    // if (router.pathname == '/') {
    //   setneed3D(false)
    //   console.log('root')
    // }
    // if (router.pathname == '/garden') {
    //   setneed3D(true)
    //   console.log('root')
    // }
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

    appManager.canvas = canvasRef.current

    const axesHelper = new THREE.AxesHelper(5)
    // appManager.scene.add(axesHelper)

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

  useEffect(() => {
    const appManager = AppManager.getInstance()
    console.log('need3D Updated', need3D)
    if (need3D === false) {
      canvasRef.current.style.visibility = 'hidden'
      appManager.appState = AppStateEnum.PAUSED
    } else {
      canvasRef.current.style.visibility = 'visible'
      appManager.appState = AppStateEnum.RUNNING
    }
  }, [need3D])

  function render() {
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime
    const appManager = AppManager.getInstance()
    // stats.begin()
    // const elapsedTime = appManager.clock.getElapsedTime()
    // const deltaTime = elapsedTime - appManager.oldElapsedTime
    // appManager.oldElapsedTime = elapsedTime

    appManager.update(deltaTime)
    requestAnimationFrame(render)

    // stats.end()
  }

  function resizeCanvas() {
    const appManager = AppManager.getInstance()

    appManager.canvas.style.width = '100%'
    appManager.canvas.style.height = '100%'

    appManager.canvas.width = window.innerWidth
    appManager.canvas.height = window.innerHeight

    appManager.onWindowResize()
  }

  function onLoadErrorFunction(error: ErrorEvent): void {
    console.log('error')
  }
  function onModelLoadedFunction(gltf: GLTF, loadingPercent: number): void {
    console.log('loaded', gltf.scene.name)
  }
  function onAllLoadedFunction(): void {
    console.log('loading finished')
    const appManager = AppManager.getInstance()
    // if (router.pathname === '/garden') {
    //   SpaceEntryService.shallPlayIntro(false)
    // }
    appManager.appState = AppStateEnum.INITIALIZING
    setTimeout(() => {
      if (router.pathname !== '/') {
        localStorage.setItem('intro', 'false')
      }
      if (router.query.withIntro) {
        localStorage.setItem('display3D', 'true')
        WebglService.resetIntro()
      }
      console.log('display3D', localStorage.getItem('display3D'))
      setneed3D(localStorage.getItem('display3D') === 'true' ? true : false)
      LoadingService.loadingFinished()
    }, 100)
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
          zIndex: 2,
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
          zIndex: 3,

          top: 0,
          left: 0,
        }}
      ></div>
      {/* <button
        style={{
          position: 'absolute',
          zIndex: '4',
          top: '100px',
        }}
        onClick={() => {
          AppManager.getInstance().devMode = !AppManager.getInstance().devMode
        }}
      >
        devMode
      </button> */}
      {/* {elementNear && (
        <div
          style={{
            position: 'absolute',
            zIndex: 3,
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
      )} */}

      <canvas className={css.canvas} ref={canvasRef} id="canvas" />
    </div>
  )
}
