import { StateSignal } from '@solid-js/signal'

class WebglService {
  public with3Dsignal = StateSignal<boolean>(undefined)
  public PoiSignal = StateSignal<string>(undefined)
  public resetSignal = StateSignal<boolean>(undefined)

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

  public resetIntro() {
    this.resetSignal.dispatch(true)
  }
}

export default new WebglService()
