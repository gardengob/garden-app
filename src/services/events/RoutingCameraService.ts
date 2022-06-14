import { StateSignal } from '@solid-js/signal'
import { time } from 'console'
import { Component3dName } from '../../webGL/webGLArchitecture/Types/Component3dNameType'

class RoutingCameraService {
  public signal = StateSignal<{ corespondingTime: number; name: string }>(
    undefined
  )
  public with3Dsignal = StateSignal<boolean>(false)
  public cameraSignal = StateSignal<'intro' | 'garden'>(undefined)

  routeSpaceDictionnary: { [key: string]: string } = {
    recipes: 'kitchen',
    contest: 'contest',
    profils: 'tree',
    family: 'portal',
    garden: 'start',
    encyclopedia: 'vegetable_garden',
    mailbox: 'mail_box',
    media: 'memories',
  }
  public cameraTimedPositions: { [key: string]: number } = {
    start: 0,
    mail_box: 3,
    vegetable_garden: 5.5,
    kitchen: 7,
    memories: 8.3,
    tree: 9.5,
    contest: 11,
    portal: 14.5,
  }

  public goTo(
    spaceName: Component3dName | 'start' | 'continue',
    shadow?: boolean
  ) {
    const camTargetedPosition =
      spaceName !== 'continue' ? this.cameraTimedPositions[spaceName] : 0
    this.signal.dispatch({
      corespondingTime: camTargetedPosition,
      name: spaceName,
    })
  }

  public toggle3D(state: boolean) {
    console.log('ee')
    this.with3Dsignal.dispatch(state)
  }
  public toggleCamera(camera: 'intro' | 'garden') {
    console.log('ee')
    this.cameraSignal.dispatch(camera)
  }
}

export default new RoutingCameraService()
