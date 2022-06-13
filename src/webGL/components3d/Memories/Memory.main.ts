import { Component3d } from '../../webGLArchitecture/Classes/Compoment3d/Component3d'
import { MemoryGraphConstruction } from './Memory.graphConstruction'
import { MemoryInitialization } from './Memory.intialization'

import { GLTF } from 'three-stdlib'

import { LoadingManager } from '../../webGLArchitecture/Classes/LoadingManager/LoadingManager'
import {
  Box3,
  CanvasTexture,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Vector3,
} from 'three'
import MediaService from '../../../services/MediaService'
import smartcrop from 'smartcrop'

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
  'carre_1',
  'carre_2',
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

    console.log('frameName', frameName)
    const frameType = frameName.split('_')[0]
    const sizes = {
      portrait: { x: 2, y: 2 },
      paysage: { x: 2, y: 2 },
      carre: { x: 2, y: 2 },
    }

    const frameSizes = {
      portrait: { width: 500, height: 750 },
      paysage: { width: 750, height: 500 },
      carre: { width: 500, height: 500 },
    }

    const canvas = document.createElement('canvas')
    const img = document.createElement('img')
    const ctx = canvas.getContext('2d')

    const croppedCanvas = document.createElement('canvas')
    const croppedCtx = croppedCanvas.getContext('2d')
    document.querySelector('.img-holder').append(img)
    img.style.height = 'auto'
    img.style.width = 'auto'
    img.style.visibility = 'hidden'
    // document.querySelector('.img-debug-holder').append(croppedCanvas)
    canvas.height = 512
    croppedCanvas.height = frameSizes[frameType].height
    croppedCanvas.width = frameSizes[frameType].width
    img.src = imgUrl
    img.onload = function () {
      setTimeout(() => {}, 0)
      img.crossOrigin = 'anonymous'
      img.width = 512
      img.height = img.height
      ctx.drawImage(img, 0, 0)
      smartcrop.crop(img, frameSizes[frameType]).then(function (result) {
        console.log('croped ', result)
        croppedCtx.drawImage(
          img,
          result.topCrop.x,
          result.topCrop.y,
          result.topCrop.width,
          result.topCrop.height,
          0,
          0,
          frameSizes[frameType].width,
          frameSizes[frameType].height
        )
      })
      const texture = new CanvasTexture(croppedCanvas)
      texture.needsUpdate = true

      // console.log('frameObject', frameObject)
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

        // let fitScaleX = (15 * frameSize.x) / texture.image.width
        // let fitScaleY = (15 * frameSize.y) / texture.image.height
        // let fitCoverScale = Math.max(fitScaleX, fitScaleY)

        // var repeatX = -1 / fitCoverScale
        // var repeatY = -1 / fitCoverScale

        let imgRatio = texture.image.width / texture.image.height
        let planeRatio = frameSize.x / frameSize.y

        let yScale = 16 / 9
        let xScale = 16 / 9
        // if (xScale > 1) {
        //   // it doesn't cover so based on x instead
        //   xScale = 1
        //   yScale = imgRatio / planeRatio
        // }
        // texture.repeat.set(xScale, yScale)

        // texture.wrapS = RepeatWrapping
        // texture.wrapT = RepeatWrapping

        // texture.repeat.x = repeatX
        // texture.repeat.y = repeatY

        console.log('frameName', frameName)
        const sizes = {
          portrait: { x: 2, y: 2 },
          paysage: { x: 2, y: 2 },
          carre: { x: 2, y: 2 },
        }

        console.log('frameType', frameType)

        const geometry = new PlaneGeometry(
          sizes[frameType].x,
          sizes[frameType].y
        )
        const material = new MeshBasicMaterial({
          map: texture,
          side: DoubleSide,
        })
        const plane = new Mesh(geometry, material)
        frameObject.parent.add(plane)
        plane.position.z += 0.55
        // frameMesh.getWorldPosition(worldFramePos)
        // plane.position.set(worldFramePos.x, worldFramePos.y, worldFramePos.z)
      }
    }
  })
  // const light = new AmbientLight(0x404040) // soft white light
  // memoryComponent3d.root.add(light)
  memoryComponent3d.root.add(tonel.getModel())
  console.log('tonel', tonel)
  MemoryGraphConstruction(memoryComponent3d)
  MemoryInitialization(memoryComponent3d)
}
