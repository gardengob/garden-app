import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import LoadingOverlay from '../components/loadingOverlay/LoadingOverlay'
import LoadingService from '../services/events/LoadingService'
import '../styles/globals.scss'
import css from './_app.module.scss'
const Garden3d = dynamic(import('../components/garden3d/Garden3d'), {
  ssr: false,
})

function MyApp({ Component, pageProps }) {
  const [loading, setloading] = useState(true)

  useEffect(() => {
    LoadingService.signal.on(() => {
      setloading(false)
    })
  }, [])

  return (
    <>
      {loading && (
        <LoadingOverlay />
      )}
      <Garden3d className={css.webgl} />
      <Component {...pageProps} className={css.content} />
    </>
  )
}

export default MyApp
