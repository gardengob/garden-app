/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import RecipeForm, {
  ERecipeFormMode,
} from '../components/recipeForm/RecipeForm'
import RippedPaper from '../components/rippedPaper/RippedPaper'
import RecipeService from '../services/RecipeService'
import { IRecipe } from '../types/recipe'
import css from './edit-recipe.module.scss'

export default function AddRecipe() {
  const router = useRouter()
  const { rid } = router.query
  const [recipe, setRecipe] = useState<IRecipe>(null)

  // ------------------------------------------------------------------- USE

  useEffect(() => {
    if (rid) {
      RecipeService.getRecipe(rid).then((reci) =>
        setRecipe({
          id: reci.id,
          familyId: reci.familyId,
          authorId: reci.authorId,
          name: reci.name,
          peopleAmount: reci.peopleAmount,
          preparationTime: reci.preparationTime,
          cookingTime: reci.cookingTime,
          ingredients: reci.ingredients,
          instructions: reci.instructions,
          imageUrl: reci.imageUrl,
          difficulty: reci.difficulty,
          diet: reci.diet,
          dish: reci.dish,
          tags: reci.tags,
        })
      )
    }
  }, [rid])

  // ------------------------------------------------------------------- METHODS

  // ------------------------------------------------------------------- RENDER

  return (
    <div className={css.root}>
      <div className={css.ripped}>
        <RippedPaper reverse={true} />
      </div>
      <a className={css.back} onClick={() => router.back()}>
        <img className={css.icon} src={`/images/icons/back.svg`} alt="" />
      </a>
      <h1 className={css.title}>Modification d'une recette</h1>
      {recipe && <RecipeForm recipe={recipe} mode={ERecipeFormMode.EDIT} />}
    </div>
  )
}
