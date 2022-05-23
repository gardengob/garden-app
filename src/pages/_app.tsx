import dynamic from 'next/dynamic'
import Header from '../components/header/Header'
import '../styles/globals.scss'
import css from './_app.module.scss'
const Garden3d = dynamic(import('../components/garden3d/Garden3d'), {
  ssr: false,
})

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Garden3d className={css.webgl} />
      <Component {...pageProps} className={css.content} />
    </>
  )
}

export default MyApp
