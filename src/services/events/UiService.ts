import { StateSignal } from '@solid-js/signal'

class UiService {
  public displayUisignal = StateSignal<boolean | string>(undefined)

  public toggleUi(displayUi: boolean | string) {
    this.displayUisignal.dispatch(displayUi)
  }
}

export default new UiService()
