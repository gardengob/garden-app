/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import RecipeDisplay from '../../components/recipeDisplay/RecipeDisplay'
import RippedPaper from '../../components/rippedPaper/RippedPaper'
import RoutingCameraService from '../../services/events/RoutingCameraService'
import RecipeService from '../../services/RecipeService'
import { IRecipe } from '../../types/recipe'
import { merge } from '../../utils/arrayUtils'
import css from './[rid].module.scss'

const Recipe = () => {
  const router = useRouter()
  const { rid } = router.query
  const [recipe, setRecipe] = useState<IRecipe>(null)
  useEffect(() => {
    localStorage.setItem('display3D', 'false')
  }, [])
  useEffect(() => {
    if (rid) {
      RecipeService.getRecipe(rid).then((reci) => {
        setRecipe(reci)
      })
    }
  }, [rid])

  useEffect(() => {
    console.log(recipe)
  }, [recipe])

  return (
    <div className={merge([css.root, 'garden-ui'])}>
      {recipe && (
        <>
          <RecipeDisplay recipe={recipe} />
          <div className={css.ripped}>
            <RippedPaper />
          </div>
        </>
      )}
    </div>
  )
}

export default Recipe
