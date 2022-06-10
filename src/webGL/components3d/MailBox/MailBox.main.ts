import {
  Component3d,
  Component3dStateEnum,
} from '../../webGLArchitecture/Classes/Compoment3d/Component3d'
import { MailBoxGraphConstruction } from './MailBox.graphConstruction'
import { MailBoxInitialization } from './MailBox.intialization'
import { GLTF } from 'three-stdlib'
import { LoadingManager } from '../../webGLArchitecture/Classes/LoadingManager/LoadingManager'
import { Vector3 } from 'three'
import { AppManager } from '../../webGLArchitecture/Classes/AppManager/AppManager'
const loadingManager = LoadingManager.getInstance()

export const mailboxComponent3d = new Component3d()
mailboxComponent3d.name = 'mail_box'
mailboxComponent3d.placeHolderName = 'Letterbox'
mailboxComponent3d.expectedObjects = ['boitemail_space']

mailboxComponent3d.onInit = () => {
  const gltfMap: Map<string, GLTF> = loadingManager.getFromList(
    mailboxComponent3d.expectedObjects
  )

  const elem = document.createElement('div')
  elem.textContent = 'patate'
  elem.style.color = 'red'
  document.querySelector('.poi-holder').appendChild(elem)
  const rootWorldPos = new Vector3(1, 0, 2)
  console.log('rootWorldPos', rootWorldPos)
  // mailboxComponent3d.root.getWorldPosition(rootWorldPos)

  mailboxComponent3d.poiArray.push({
    htmlElement: elem,
    position: rootWorldPos,
  })

  mailboxComponent3d.assignLoadedSceneObjects(gltfMap)
  const space = mailboxComponent3d.getObject('boitemail_space')

  // const light = new AmbientLight(0x404040) // soft white light
  // mailboxComponent3d.root.add(light)
  mailboxComponent3d.root.add(space.getModel())
  // mailboxComponent3d.root.position.set(-5, 0, 7)

  mailboxComponent3d.status = Component3dStateEnum.ONGOING
}

mailboxComponent3d.onAnimationLoop = () => {
  const appManager = AppManager.getInstance()
  console.log('etstet')
  mailboxComponent3d.drawPOIs(appManager.camera, appManager.canvas)
}

MailBoxGraphConstruction(mailboxComponent3d)
MailBoxInitialization(mailboxComponent3d)
