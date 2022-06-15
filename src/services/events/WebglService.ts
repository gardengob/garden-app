import { StateSignal } from '@solid-js/signal'

class WebglService {
  public with3Dsignal = StateSignal<boolean>(undefined)
  public PoiSignal = StateSignal<string>(undefined)

  public webGlInitialized = false
  public enable3D() {
    this.with3Dsignal.dispatch(true)
  }

  public disable3D() {
    this.with3Dsignal.dispatch(false)
  }

  public ActivatePOI(name: string) {
    this.PoiSignal.dispatch(name)
  }
}

export default new WebglService()
