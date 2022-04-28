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
export interface IWindowSize {
  width: number
  height: number
}

const stats = Stats()

export default function Garden3d() {
  const canvasRef = useRef(null)
  let time = Date.now()
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: 0,
    height: 0,
  })
  const [elementNear, setElementNear] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const loadingManager = LoadingManager.getInstance()
    const appManager = AppManager.getInstance()

    SpaceEntryService.signal.on((name) => {
      console.log('inUi', name)
      setElementNear(name)
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

    const helper = new THREE.CameraHelper(appManager.camera)
    appManager.scene.add(helper)

    appManager.camera.lookAt(new THREE.Vector3(0, 0, 0))

    appManager.devMode = false

    //déso j'en ai eu marre
    resizeCanvas()
    resizeCanvas()

    appManager.appInitializationFunction = () => {
      console.log('appInit called')
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
    const appManager = AppManager.getInstance()

    appManager.appState = AppStateEnum.INITIALIZING
    console.log('all model loaded')
  }
  function onLoadingFunction(xhr: ProgressEvent<EventTarget>): void {
    // console.log(Math.round((xhr.loaded * 100) / xhr.total))
  }

  return (
    <div className={css.webgl}>
      {/* <div>{stats.domElement}</div> */}
      <button
        style={{
          position: 'absolute',
        }}
        onClick={() => {
          AppManager.getInstance().devMode = !AppManager.getInstance().devMode
        }}
      >
        devMode
      </button>
      {elementNear && (
        <div
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
