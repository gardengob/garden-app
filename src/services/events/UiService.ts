import { StateSignal } from '@solid-js/signal'

class UiService {
  public displayUisignal = StateSignal<boolean | string>(undefined)
  public displayTutoSignal = StateSignal<boolean>(undefined)

  public toggleUi(displayUi: boolean | string) {
    this.displayUisignal.dispatch(displayUi)
  }
  public showTuto() {
    this.displayTutoSignal.dispatch(true)
  }
  public hideTuto() {
    this.displayTutoSignal.dispatch(false)
  }
}

export default new UiService()
