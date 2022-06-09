import { AppManager } from '../../webGLArchitecture/Classes/AppManager/AppManager'
import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'
import { MemoryGraphConstruction } from './Memory.graphConstruction'
import { MemoryInitialization } from './Memory.intialization'

import { GLTF } from 'three-stdlib'

import { LoadingManager } from '../../webGLArchitecture/Classes/LoadingManager/LoadingManager'
import {
  Box3,
  CanvasTexture,
  ClampToEdgeWrapping,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PlaneBufferGeometry,
  RepeatWrapping,
  Texture,
  TextureLoader,
  Vector3,
} from 'three'
import MediaService from '../../../services/MediaService'

const loadingManager = LoadingManager.getInstance()

export const memoryComponent3d = new Component3d()
memoryComponent3d.name = 'memories'
memoryComponent3d.placeHolderName = 'Memories'
memoryComponent3d.expectedObjects = ['memories_space']
const memoriesFrames: string[] = [
  'portrait_1',
  'portrait_2',
  'portrait_3',
  'paysage_1',
  'paysage_2',
  'paysage_3',
  'cadre_1',
  'cadre_2',
]

memoryComponent3d.onInit = () => {
  const gltfMap: Map<string, GLTF> = loadingManager.getFromList(
    memoryComponent3d.expectedObjects
  )

  memoryComponent3d.assignLoadedSceneObjects(gltfMap)
  const tonel = memoryComponent3d.getObject('memories_space')

  memoriesFrames.forEach((frameName, index) => {
    const frameObject = tonel.getModel().getObjectByName(`${frameName}_2`)
    const imgUrl = MediaService.getRandomMedias()[index]

    const canvas = document.createElement('canvas')
    const img = document.createElement('img')
    const ctx = canvas.getContext('2d')
    // document.querySelector('.img-debug-holder').append(img)
    // document.querySelector('.img-debug-holder').append(canvas)
    img.height = 350
    canvas.width = 350
    canvas.height = 350
    img.onload = function () {
      ctx.drawImage(img, 0, 0)
      const texture = new CanvasTexture(canvas)
      texture.needsUpdate = true
      // const texture = new TextureLoader().load(imgUrl)
      console.log('frameObject', frameObject)
      if (frameObject) {
        const box = new Box3()
        const frameMesh = frameObject as Mesh

        frameMesh.geometry.computeBoundingBox()

        box
          .copy(frameMesh.geometry.boundingBox)
          .applyMatrix4(frameMesh.matrixWorld)

        const frameSize = new Vector3()

        box.getSize(frameSize)
        console.log('frameSize', frameSize)

        let imgRatio = texture.image.width / texture.image.height
        let planeRatio = frameSize.x / frameSize.y

        let yScale = 1
        let xScale = planeRatio / imgRatio
        if (xScale > 1) {
          // it doesn't cover so based on x instead
          xScale = 1
          yScale = imgRatio / planeRatio
        }
        texture.repeat.set(xScale, yScale)

        texture.wrapS = RepeatWrapping

        frameMesh.material = new MeshBasicMaterial({ map: texture })
      }
    }
    img.crossOrigin = 'anonymous'
    img.src = imgUrl
  })
  // const light = new AmbientLight(0x404040) // soft white light
  // memoryComponent3d.root.add(light)
  memoryComponent3d.root.add(tonel.getModel())
  console.log('tonel', tonel)
  MemoryGraphConstruction(memoryComponent3d)
  MemoryInitialization(memoryComponent3d)
}
