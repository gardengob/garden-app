/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import css from './404.module.scss'

export default function FourOhFour() {
  return (
    <div className={css.root}>
      <img className={css.plants} src="/images/ui/decors_plantes.png" alt="" />
      <div>
        <h1 className={css.title}>404</h1>
        <Link href="/">
          <a className={css.button}>Retourner à l'accueil</a>
        </Link>
      </div>
    </div>
  )
}
