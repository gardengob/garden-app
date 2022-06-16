/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import RoutingCameraService from '../services/events/RoutingCameraService'
import { useEffect, useState } from 'react'
import RecipePreview from '../components/recipePreview/RecipePreview'
import RippedPaper from '../components/rippedPaper/RippedPaper'
import FamilyService from '../services/FamilyService'
import { supabase } from '../utils/supabaseClient'
import { Component3dName } from '../webGL/webGLArchitecture/Types/Component3dNameType'
import css from './ingredients.module.scss'
import Image from 'next/image'
import IngredientPreview from '../components/ingredientPreview/IngredientPreview'
import IngredientDisplay from '../components/ingredientDisplay/IngredientDisplay'
import { merge } from '../utils/arrayUtils'

export default function Ingredients() {
  const CAMERA_POSITION: Component3dName = 'vegetable_garden'
  const router = useRouter()
  const mock_Ingredients = [
    {
      id: '7b77f42f-64b0-4361-a9fb-3a9363e07be5',
      name: 'Carotte',
      type: 'Légume',
      imageUrl: '/images/user.png',
    },
    {
      id: '7b77f42f-64b0-4361-a9fb-3a9363e07be5',
      name: 'Poireau',
      type: 'Légume',
      imageUrl: '/images/user.png',
    },
    {
      id: '7b77f42f-64b0-4361-a9fb-3a9363e07be5',
      name: 'Tomate',
      type: 'Légume',
      imageUrl: '/images/user.png',
    },
    {
      id: '7b77f42f-64b0-4361-a9fb-3a9363e07be5',
      name: 'Artichaut',
      type: 'Légume',
      imageUrl: '/images/user.png',
    },
    {
      id: '7b77f42f-64b0-4361-a9fb-3a9363e07be5',
      name: 'Artichaut',
      type: 'Légume',
      imageUrl: '/images/user.png',
    },
    {
      id: '7b77f42f-64b0-4361-a9fb-3a9363e07be5',
      name: 'Artichaut',
      type: 'Légume',
      imageUrl: '/images/user.png',
    },
    {
      id: '7b77f42f-64b0-4361-a9fb-3a9363e07be5',
      name: 'Artichaut',
      type: 'Légume',
      imageUrl: '/images/user.png',
    },
  ]
  const [ingredients, setIngredients] = useState(mock_Ingredients)

  const [currentIngredient, setCurrentIngredient] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    RoutingCameraService.goTo(CAMERA_POSITION)
    localStorage.setItem('lockScroll', 'true')
    localStorage.setItem('display3D', 'true')
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
    <div className={merge([css.root, 'garden-ui'])}>
      {!currentIngredient && (
        <div className={css.container}>
          <div
            className={css.close}
            onClick={() => {
              router.push('garden')
            }}
          >
            <Image
              className={css.icon}
              src={`/images/icons/cross.svg`}
              alt={'close'}
              width={24}
              height={24}
            />
          </div>
          <div className={css.head}>
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
          </div>
          <div className={css.ingredients}>
            {ingredients.map((ingredient, i) => {
              return (
                <div
                  className={css.ingredient}
                  key={i}
                  onClick={() => setCurrentIngredient(ingredient)}
                >
                  <IngredientPreview ingredient={ingredient} />
                </div>
              )
            })}
          </div>
        </div>
      )}
      {currentIngredient && (
        <>
          <div className={css.back} onClick={() => setCurrentIngredient(null)}>
            <img className={css.icon} src={`/images/icons/back.svg`} alt="" />
          </div>

          <IngredientDisplay
            ingredient={currentIngredient}
            backHandler={() => setCurrentIngredient(null)}
          />
        </>
      )}
    </div>
  )
}
