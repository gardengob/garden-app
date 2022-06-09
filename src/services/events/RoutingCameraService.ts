import { StateSignal } from '@solid-js/signal'
import { time } from 'console'
import { Component3dName } from '../../webGL/webGLArchitecture/Types/Component3dNameType'

class RoutingCameraService {
  public signal = StateSignal<{ corespondingTime: number; name: string }>(
    undefined
  )

  routeSpaceDictionnary: { [key: string]: string } = {
    recipes: 'kitchen',
    contest: 'contest',
    profils: 'tree',
    family: 'portal',
    garden: 'start',
    encyclopedia: 'vegetable_garden',
    notification: 'mail_box',
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

  public goTo(spaceName: Component3dName | 'start') {
    const camTargetedPosition = this.cameraTimedPositions[spaceName]
    this.signal.dispatch({
      corespondingTime: camTargetedPosition,
      name: spaceName,
    })
  }
}

export default new RoutingCameraService()