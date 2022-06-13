/* eslint-disable @next/next/no-img-element */
import { merge } from '../../utils/arrayUtils'
import css from './RippedPaper.module.scss'

export default function RippedPaper({reverse = false}) {
  return (
    <div className={merge([css.root, reverse ? css['root-reverse'] : ''])}>
      <img className={css.image} src={'/images/ui/ripped-paper.png'} alt={'Papier déchiré'} />
    </div>
  )
}
