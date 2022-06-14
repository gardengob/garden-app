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
import css from './recipes.module.scss'
import { merge } from '../utils/arrayUtils'
import UiService from '../services/events/UiService'
import WebglService from '../services/events/WebglService'

export default function Recipes() {
  const CAMERA_POSITION: Component3dName = 'kitchen'

  const router = useRouter()
  const [recipes, setRecipes] = useState([])
  // const [displayUI, setDisplayUI] = useState<boolean>(false)
  useEffect(() => {
    RoutingCameraService.goTo(CAMERA_POSITION)
    WebglService.disable3D()

    localStorage.setItem('display3D', 'false')
  }, [])

  useEffect(() => {
    const subscription = supabase
      .from('user_family')
      .on('*', (payload) => {
        FamilyService.getRecipes(localStorage.getItem('familyId')).then(
          (families) => setRecipes(families)
        )
      })
      .subscribe()

    FamilyService.getRecipes(localStorage.getItem('familyId')).then(
      (familyRecipes) => setRecipes(familyRecipes)
    )

    return () => {
      supabase.removeSubscription(subscription)
    }
  }, [])

  return (
    <div className={merge([css.root, 'garden-ui'])}>
      <div className={css.head}>
        <Link href={`/garden`}>
          <a className={css.back}>
            <img className={css.icon} src={`/images/icons/back.svg`} alt="" />
          </a>
        </Link>
        <h1 className={css.title}>Les recettes de la famille</h1>
        <Link href={`/add-recipe`}>
          <a className={css.add}>
            <img className={css.icon} src={`/images/icons/plus.svg`} alt="" />
          </a>
        </Link>
      </div>

      {recipes.map(function (recipe, i) {
        return (
          <div className={css.recipe} key={i}>
            <RecipePreview recipe={recipe} />
          </div>
        )
      })}
      <div className={css.ripped}>
        <RippedPaper />
      </div>
    </div>
  )
}
