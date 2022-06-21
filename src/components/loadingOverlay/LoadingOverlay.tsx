import css from './LoadingOverlay.module.scss'
import Lottie from 'lottie-web'
import { useEffect, useRef } from 'react'
import condomJson from '../../lotties/anim-onboarding.json'

export default function LoadingOverlay() {
  const loadingRefEl = useRef(null)
  const loadingRef = useRef(null)

  useEffect(() => {
    // SETUP LOTTIE.S THAT ARE USED IN COMPONENT
    loadingRef.current = Lottie.loadAnimation({
      container: loadingRefEl.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: condomJson,
    })
  }, [])

  return (
    <div className={css.root}>
      Loading ...
      <div ref={loadingRefEl}></div>
    </div>
  )
}
