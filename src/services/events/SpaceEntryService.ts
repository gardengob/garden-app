import { StateSignal } from '@solid-js/signal'
import { Component3d } from '../../webGL/webGLArchitecture/Classes/Compoment3d/Component3d'
import { Component3dName } from '../../webGL/webGLArchitecture/Types/Component3dNameType'
class SpaceEntryService {
  public spaceSignal = StateSignal<Component3dName>(undefined)
  public gardenEntrySignal = StateSignal<boolean>(false)
  public routeEntrySignal = StateSignal<boolean>(false)

  public setNearElement(componentName: Component3dName) {
    this.spaceSignal.dispatch(componentName)
  }

  public enterGarden() {
    this.gardenEntrySignal.dispatch(true)
  }
  public shallPlayIntro(state: boolean) {
    console.log('in shall play')
    this.routeEntrySignal.dispatch(state)
  }
}

export default new SpaceEntryService()
