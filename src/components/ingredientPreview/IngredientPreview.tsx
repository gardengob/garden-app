import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
import css from './IngredientPreview.module.scss'

export default function IngredientPreview({ ingredient }) {
  return (
    <div className={css.root}>
      <div className={css.container}>
        <h4 className={css.name}>{ingredient.name}</h4>
        <p className={css.type}>{ingredient.type}</p>
        <div className={css.image}>
          <Image
            src={'/images/fraise.png'}
            alt={''}
            width={100}
            height={100}
            objectFit={'cover'}
            layout={'responsive'}
          />
        </div>
      </div>
    </div>
  )
}
