import {
  Component3d,
  Component3dStateEnum,
} from '../../webGLArchitecture/Classes/Compoment3d/Component3d'
import { MailBoxGraphConstruction } from './MailBox.graphConstruction'
import { MailBoxInitialization } from './MailBox.intialization'
import { GLTF } from 'three-stdlib'
import { CSS2DObject } from '../../renderers/CSS2DRenderer'
import { LoadingManager } from '../../webGLArchitecture/Classes/LoadingManager/LoadingManager'
import { Object3D, Vector3 } from 'three'
import { AppManager } from '../../webGLArchitecture/Classes/AppManager/AppManager'
import WebglService from '../../../services/events/WebglService'
const loadingManager = LoadingManager.getInstance()

export const mailboxComponent3d = new Component3d()
mailboxComponent3d.name = 'mail_box'
mailboxComponent3d.placeHolderName = 'Letterbox'
mailboxComponent3d.expectedObjects = ['boitemail_space']

mailboxComponent3d.onInit = () => {
  const appManager = AppManager.getInstance()

  const gltfMap: Map<string, GLTF> = loadingManager.getFromList(
    mailboxComponent3d.expectedObjects
  )

  const mailBoxPOIHolder = new Object3D()
  mailBoxPOIHolder.position.y = 1
  mailBoxPOIHolder.position.x = 0.2
  mailBoxPOIHolder.position.z = 0.1

  const packagePOIHolder = new Object3D()
  packagePOIHolder.position.y = 0.5
  packagePOIHolder.position.x = -0.15
  packagePOIHolder.position.z = -0.5

  mailboxComponent3d.root.add(mailBoxPOIHolder)
  mailboxComponent3d.root.add(packagePOIHolder)

  // mailboxComponent3d.root.getWorldPosition(rootWorldPos)

  mailboxComponent3d.poiArray.push(
    {
      onclick: () => {
        console.log('mailBox')
        WebglService.ActivatePOI('notifications')
      },
      icon: '01_box_letter',
      holder: mailBoxPOIHolder,
    },
    {
      onclick: () => {
        console.log('package')
      },
      icon: '02_livre',
      holder: packagePOIHolder,
    }
  )

  mailboxComponent3d.drawPOIs()

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
}

MailBoxGraphConstruction(mailboxComponent3d)
MailBoxInitialization(mailboxComponent3d)
