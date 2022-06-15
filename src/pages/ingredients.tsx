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

export default function Ingredients() {
  const CAMERA_POSITION: Component3dName = 'vegetable_garden'
  const router = useRouter()

  const [ingredients, setIngredients] = useState([
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
  ])

  const [currentIngredient, setCurrentIngredient] = useState(null)

  useEffect(() => {
    RoutingCameraService.goTo(CAMERA_POSITION)
    localStorage.setItem('lockScroll', 'true')
    localStorage.setItem('display3D', 'true')
  }, [])

  return (
    <div className={css.root}>
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
