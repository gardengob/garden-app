import Link from 'next/link'
import css from './Header.module.scss'

export default function Header() {
  return (
    <div className={css.root}>
      <ul className={css.list}>
        <li className={css.link}>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li className={css.link}>
          <Link href="/family">
            <a>Family</a>
          </Link>
        </li>
        <li className={css.link}>
          <Link href="/garden">
            <a>3D Garden</a>
          </Link>
        </li>
        <li className={css.link}>
          <Link href="/recipes">
            <a>Recipes</a>
          </Link>
        </li>
        <li className={css.link}>
          <Link href="/contest">
            <a>Contest</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}
