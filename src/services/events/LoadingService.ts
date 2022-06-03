import { StateSignal } from '@solid-js/signal'

class LoadingService {
  public signal = StateSignal<boolean>(undefined)

  public loadingFinished() {
    this.signal.dispatch(false)
  }
}

export default new LoadingService()
