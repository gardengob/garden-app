/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import gsap from 'gsap'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
import IngredientPreview from '../ingredientPreview/IngredientPreview'
import css from './IngredientsCarousel.module.scss'

export default function IngredientsCarousel({ onIngredientClick }) {
  const rootRef = useRef(null)
  const router = useRouter()

  const mock_Ingredients = [
    {
      name: 'Abricot',
      type: 'Fruit',
      semance: '',
      season: '',
      origin: '',
      imageUrl: '/images/ingredients/abricot.png',
    },
    {
      name: 'Ananas',
      type: 'Fruit',
      semance: 'Été',
      season: 'Décembre à Mars',
      origin: 'Guadeloupe',
      imageUrl: '/images/ingredients/ananas.png',
    },
    {
      name: 'Artichaut',
      type: 'Légume',
      semance: '',
      season: '',
      origin: '',
      imageUrl: '/images/ingredients/artichaut.png',
    },
    {
      name: 'Asperge',
      type: 'Légume',
      semance: '',
      season: '',
      origin: '',
      imageUrl: '/images/ingredients/asperge.png',
    },
    {
      name: 'Carotte',
      type: 'Légume',
      semance: '',
      season: '',
      origin: '',
      imageUrl: '/images/ingredients/carotte.png',
    },
    {
      name: 'Épinard',
      type: 'Légume',
      semance: '',
      season: '',
      origin: '',
      imageUrl: '/images/ingredients/epinard.png',
    },
    {
      name: 'Figue',
      type: 'Fruit',
      semance: '',
      season: '',
      origin: '',
      imageUrl: '/images/ingredients/figue.png',
    },
    {
      name: 'Fraise',
      type: 'Fruit',
      semance: '',
      season: '',
      origin: '',
      imageUrl: '/images/ingredients/fraise.png',
    },
    {
      name: 'Melon',
      type: 'Fruit',
      semance: '',
      season: '',
      origin: '',
      imageUrl: '/images/ingredients/melon.png',
    },
    {
      name: 'Oignons',
      type: 'Légume',
      semance: 'Août à Septembre',
      season: 'Avril à Juin',
      origin: 'Asie centrale',
      imageUrl: '/images/ingredients/oignons.png',
    },
    {
      name: 'Radis',
      type: 'Légume',
      semance: '',
      season: '',
      origin: '',
      imageUrl: '/images/ingredients/radis.png',
    },
    {
      name: 'Salade',
      type: 'Légume',
      semance: '',
      season: '',
      origin: '',
      imageUrl: '/images/ingredients/salade.png',
    },
    {
      name: 'Tomate',
      type: 'Légume',
      semance: '',
      season: '',
      origin: '',
      imageUrl: '/images/ingredients/tomate.png',
    },
  ]
  const [ingredients, setIngredients] = useState(mock_Ingredients)

  const [search, setSearch] = useState('')

  useEffect(() => {
    gsap.fromTo(
      rootRef.current,
      { y: 60, autoAlpha: 0 },
      { y: 0, autoAlpha: 1 }
    )
  }, [])

  useEffect(() => {
    setIngredients(mock_Ingredients)
    setSearch('')
    console.log('search', search)
  }, [])

  function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func.apply(this, args)
      }, timeout)
    }
  }

  const processChange = debounce((e) => {
    setSearch(e.target.value)
    const filteredIngredients = mock_Ingredients.filter((ingredients) =>
      ingredients.name
        .toLocaleLowerCase()
        .includes(e.target.value.toLocaleLowerCase())
    )
    setIngredients(filteredIngredients)
  })

  return (
    <div className={css.root} ref={rootRef}>
      <div className={css.container}>
        <div
          className={css.close}
          onClick={() => {
            router.push('garden')
          }}
        >
          <div className={css.background}></div>
          <Image
            className={css.icon}
            src={`/images/icons/cross.svg`}
            alt={'close'}
            width={24}
            height={24}
          />
        </div>
        <div className={css.head}>
          <div className={css.filters}>
            <div className={css.input}>
              <input
                className={css.search}
                name="ingredient"
                id="ingredient"
                type="text"
                placeholder="Rechercher ..."
                onChange={(e) => {
                  processChange(e)
                }}
              />
              <img className={css.icon} src="/images/icons/search.svg" alt="" />
            </div>
            <div className={css.user}><img className={css.icon} src="/images/icons/notif-user.svg" alt="" /></div>
          </div>

          <div className={css.add}>
            <div className={css.background}></div>
            <Image
              className={css.icon}
              src={`/images/icons/plus.svg`}
              alt={'close'}
              width={24}
              height={24}
            />
          </div>
        </div>
        <div className={css.ingredients}>
          {ingredients.map((ingredient, i) => {
            return (
              <div
                className={css.ingredient}
                key={i}
                onClick={() => {
                  setSearch(null)
                  setIngredients(mock_Ingredients)
                  onIngredientClick(ingredient)
                }}
              >
                <IngredientPreview ingredient={ingredient} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
