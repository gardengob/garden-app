import { StateSignal } from '@solid-js/signal'

class LoadingService {
  public signal = StateSignal<boolean>(undefined)
  public loadingNumberSignal = StateSignal<number>(undefined)

  public loadingFinished() {
    this.signal.dispatch(false)
  }

  public loadingUpdate(number) {
    this.loadingNumberSignal.dispatch(number)
  }
}

export default new LoadingService()
