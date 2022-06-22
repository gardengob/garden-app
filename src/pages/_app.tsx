import gsap from 'gsap'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import Header from '../components/header/Header'
import LoadingOverlay from '../components/loadingOverlay/LoadingOverlay'
import AudioService from '../services/events/AudioService'
import LoadingService from '../services/events/LoadingService'
import '../styles/globals.scss'
import css from './_app.module.scss'
const Garden3d = dynamic(import('../components/garden3d/Garden3d'), {
  ssr: false,
})

function MyApp({ Component, pageProps }) {
  const [loading, setloading] = useState(true)
  const [loadingNumber, setloadingNumber] = useState(0)

  const audioRef = useRef(null)

  useEffect(() => {
    const loader = { time: 0 }
    LoadingService.signal.on(() => {
      setloading(false)
    })
    LoadingService.loadingNumberSignal.on((number) => {
      setloadingNumber(number)
    })
  }, [])

  useEffect(() => {
    if (audioRef) AudioService.signal.on(() => audioRef.current.play())
  }, [])

  return (
    <>
      <audio ref={audioRef} className={css.audio} loop src="/audio/ambiance.mp3"></audio>
      {loading && <LoadingOverlay />}
      {/* <LoadingOverlay /> */}
      <Garden3d className={css.webgl} />
      <Component {...pageProps} className={css.content} />
    </>
  )
}

export default MyApp
