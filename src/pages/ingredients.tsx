/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import RoutingCameraService from '../services/events/RoutingCameraService'
import { useEffect, useRef, useState } from 'react'
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
import IngredientsCarousel from '../components/ingredientsCarousel/IngredientsCarousel'

export default function Ingredients() {
  const CAMERA_POSITION: Component3dName = 'vegetable_garden'

  const [currentIngredient, setCurrentIngredient] = useState(null)

  useEffect(() => {
    RoutingCameraService.goTo(CAMERA_POSITION)
    localStorage.setItem('lockScroll', 'true')
    localStorage.setItem('display3D', 'true')
  }, [])

  return (
    <div className={merge([css.root, 'garden-ui'])}>
      {!currentIngredient && (
        <IngredientsCarousel onIngredientClick={(ingredient) => setCurrentIngredient(ingredient)} />
      )}
      {currentIngredient && (
        <>
          <div className={css.back} onClick={() => setCurrentIngredient(null)}>
            <img
              className={css.icon}
              src={`/images/icons/back-white.svg`}
              alt=""
            />
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
