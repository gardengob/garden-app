import gsap from 'gsap'
import {
  Clock,
  Color,
  Group,
  LinearFilter,
  Object3D,
  PerspectiveCamera,
  PointLight,
  PointLightHelper,
  RGBAFormat,
  Scene,
  sRGBEncoding,
  Vector2,
  WebGLMultisampleRenderTarget,
  WebGLRenderer,
  WebGLRenderTarget,
} from 'three'
import {
  EffectComposer,
  OrbitControls,
  OutlinePass,
  RenderPass,
  SMAAPass,
} from 'three-stdlib'

import { AppModeEnum } from '../../Enums/AppModeEnum'
import { AppStateEnum } from '../../Enums/AppStateEnum'
import { LoaderStateEnum } from '../../Enums/LoaderStateEnum'
import { IUpdatable } from '../../Interfaces/IUpdatable'
export class AppManager {
  private static instance: AppManager

  // All scenes Components3d
  objectsToUpdate: IUpdatable[] = []

  // Three related props
  canvas: HTMLCanvasElement
  loader: HTMLElement
  clock: Clock = new Clock()
  oldElapsedTime = 0
  scene: Scene
  renderer: WebGLRenderer
  camera: PerspectiveCamera
  cameraHolder: Object3D

  //post-processing
  composer: EffectComposer
  outlinePass: OutlinePass

  //App global states
  appState: AppStateEnum = AppStateEnum.LOADING
  appMode: AppModeEnum = AppModeEnum.STORY
  loaderState: LoaderStateEnum = LoaderStateEnum.LOADING

  //Dev tools
  devMode: boolean = false
  loaderDisplay: boolean = true
  devCamera: PerspectiveCamera
  devControls: OrbitControls

  //holds the app initialization function, which is called after the loading
  appInitializationFunction: () => void = () => {
    console.warn('empty appinit')
  }

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement
    this.loader = document.querySelector('.loader') as HTMLElement
    this.scene = this.buildScene()
    this.renderer = this.buildRender()
    const cameraHolder = new Group()

    //Camera initialization
    this.camera = this.buildCamera()
    cameraHolder.add(this.camera)
    this.scene.add(cameraHolder)
    this.cameraHolder = cameraHolder

    //Dev camera initialization
    this.devCamera = this.buildCamera()
    cameraHolder.add(this.camera)
    this.scene.add(cameraHolder)
    this.cameraHolder = cameraHolder

    // this.camera.position.z = 10

    this.devControls = new OrbitControls(this.devCamera, this.canvas)
    this.devControls.enableDamping = true
    this.devControls.enableZoom = false
    this.devCamera.position.set(0, 20, 0)
    this.devCamera.lookAt(0, 0, 0)

    let sampleNumber

    if (
      this.renderer.getPixelRatio() === 1 &&
      this.renderer.capabilities.isWebGL2
    ) {
      sampleNumber = 4
    } else {
      sampleNumber = 0
    }

    const renderTarget: WebGLRenderTarget | any = new WebGLRenderTarget(
      800,
      600
    )
    renderTarget.options = {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      format: RGBAFormat,
      encoding: sRGBEncoding,
      powerPreference: 'high-performance',
    }
    renderTarget.sampleNumber = sampleNumber

    this.composer = new EffectComposer(this.renderer, renderTarget)

    this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.composer.setSize(this.canvas.width, this.canvas.height)

    const renderPass = new RenderPass(this.scene, this.camera)
    renderPass.setSize(window.innerWidth, window.innerHeight)
    this.composer.addPass(renderPass)

    // this.outlinePass = new OutlinePass(
    //   new Vector2(window.innerWidth, window.innerHeight),
    //   this.scene,
    //   this.camera
    // )
    // this.composer.addPass(this.outlinePass)
    // this.outlinePass.edgeStrength = 1.2
    // this.outlinePass.selectedObjects = []
    // this.outlinePass.edgeGlow = 0.2
    // this.outlinePass.edgeThickness = 1
    // this.outlinePass.pulsePeriod = 0
    // this.outlinePass.visibleEdgeColor = new Color(0xdb4a48)

    if (
      this.renderer.getPixelRatio() === 1 &&
      !this.renderer.capabilities.isWebGL2
    ) {
      const pass = new SMAAPass(
        this.renderer.domElement.clientWidth * this.renderer.pixelRatio,
        this.renderer.domElement.clientHeight * this.renderer.pixelRatio
      )
      this.composer.addPass(pass)
    }
    // const effectFXAA = new ShaderPass(FXAAShader);
    // effectFXAA.uniforms['resolution'].value.set(1 / this.canvas.width, 1 / this.canvas.height);
    //this.composer.addPass(effectFXAA);

    //this.composer.renderer.pixelRatio = 1
  }

  //Singleton Method
  public static getInstance(): AppManager {
    if (!AppManager.instance) {
      AppManager.instance = new AppManager()
    }
    return AppManager.instance
  }
  // Build Methods
  buildScene(): Scene {
    const scene = new Scene()
    // scene.background = new Color().setHSL(h, s, l);

    return scene
  }

  buildRender(): WebGLRenderer {
    const renderer = new WebGLRenderer({ canvas: this.canvas, alpha: true })
    const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1
    renderer.outputEncoding = sRGBEncoding
    renderer.setPixelRatio(DPR)
    renderer.setClearColor(0x000000, 0) // the default
    renderer.setSize(this.canvas.width, this.canvas.height)
    renderer.shadowMap.enabled = true
    // renderer.outputEncoding = sRGBEncoding;

    // renderer.toneMapping = ACESFilmicToneMapping
    // renderer.toneMappingExposure = 1.4

    return renderer
  }

  buildCamera(): PerspectiveCamera {
    const aspectRatio = this.canvas.width / this.canvas.height
    const fieldOfView = 45
    const nearPlane = 0.1
    const farPlane = 1000
    const camera = new PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    )
    // camera.zoom = 0.8
    return camera
  }

  /**
   * call the update method passed to the appManager's objectToUpdate array
   * @public
   */
  update(elapsedTime): void {
    if (this.appState === AppStateEnum.INITIALIZING) {
      //run init once
      this.appInitializationFunction()
      this.appState = AppStateEnum.RUNNING
    }
    if (this.appState === AppStateEnum.RUNNING) {
      //update everything
      for (const objectToUpdate of this.objectsToUpdate) {
        objectToUpdate.update(elapsedTime)
      }

      //   if (this.loaderDisplay) {
      //     this.loader.style.display = 'block'
      //   } else {
      //     this.loader.style.display = 'none'
      //   }

      //dev - normal view mode switch
      if (this.devMode) {
        this.renderer.render(this.scene, this.devCamera)
        this.devControls.update()
      } else {
        // this.composer.render()
        this.renderer.render(this.scene, this.camera)
      }
    }
  }

  // update camera aspect ration when screen is resized
  onWindowResize() {
    const { width, height } = this.canvas
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.composer.setSize(window.innerWidth, window.innerHeight)
  }
}
