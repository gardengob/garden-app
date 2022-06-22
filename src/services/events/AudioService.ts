import { StateSignal } from '@solid-js/signal'

export type  AudioSignal = "on" | "off"
class AudioService {
  public signal = StateSignal<AudioSignal>(undefined)

  public start() {
    this.signal.dispatch("on")
  }

  public stop() {
    this.signal.dispatch("off")
  }
}

export default new AudioService()
