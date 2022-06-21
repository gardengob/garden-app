import gsap from 'gsap'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import LoadingService from '../services/events/LoadingService'
import '../styles/globals.scss'
import css from './_app.module.scss'
const Garden3d = dynamic(import('../components/garden3d/Garden3d'), {
  ssr: false,
})

function MyApp({ Component, pageProps }) {
  const [loading, setloading] = useState(true)
  const [loadingNumber, setloadingNumber] = useState(0)

  useEffect(() => {
    const loader = { time: 0 }
    LoadingService.signal.on(() => {
      setloading(false)
    })
    LoadingService.loadingNumberSignal.on((number) => {
      setloadingNumber(number)
    })
  }, [])

  return (
    <>
      {loading && (
        <div
          style={{
            position: 'absolute',
            zIndex: '50',
            height: '100vh',
            width: '100vw',
            top: '0',
            left: '0',
            backgroundColor: '#1c2d22',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Loading... {loadingNumber}
        </div>
      )}
      <Garden3d className={css.webgl} />
      <Component {...pageProps} className={css.content} />
    </>
  )
}

export default MyApp
