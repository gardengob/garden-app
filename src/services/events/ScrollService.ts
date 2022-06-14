import { StateSignal } from '@solid-js/signal'

class ScrollService {
  public signal = StateSignal<WheelEvent>(undefined)

  public scrolling(event: WheelEvent) {
    console.log('scrolling')
    this.signal.dispatch(event)
  }

  public stopped() {
    this.signal.dispatch(null)
  }
}

export default new ScrollService()
