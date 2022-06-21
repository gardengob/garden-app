import css from './LoadingOverlay.module.scss'
import Lottie from 'lottie-web'
import { useEffect, useRef, useState } from 'react'
import loadingJson from '../../lotties/anim-loading.json'
import LoadingService from '../../services/events/LoadingService'

export default function LoadingOverlay() {
  const loadingRefEl = useRef(null)
  const loadingRef = useRef(null)

  const [loadingNumber, setloadingNumber] = useState(0)

  useEffect(() => {
    // SETUP LOTTIE.S THAT ARE USED IN COMPONENT
    loadingRef.current = Lottie.loadAnimation({
      container: loadingRefEl.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: loadingJson,
    })

    LoadingService.loadingNumberSignal.on((number) => {
      setloadingNumber(number)
    })
  }, [])

  return (
    <div className={css.root}>
      <div className={css.lottie} ref={loadingRefEl}></div>
      <div className={css.number}>{loadingNumber}%</div>
    </div>
  )
}
