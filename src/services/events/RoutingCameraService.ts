import { StateSignal } from '@solid-js/signal'
import { time } from 'console'
import { Component3dName } from '../../webGL/webGLArchitecture/Types/Component3dNameType'

class RoutingCameraService {
  public signal = StateSignal<number>(undefined)
  public cameraTimedPositions: { [key: string]: number } = {
    start: 0,
    mailbox: 2,
    garden: 5,
    kitchen: 7,
    tree: 9,
    contest: 10,
  }

  public goTo(spaceName: Component3dName | 'start') {
    const camTargetedPosition = this.cameraTimedPositions[spaceName]
    this.signal.dispatch(camTargetedPosition)
  }
}

export default new RoutingCameraService()
