import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useState } from 'react'
import ProgressBar from '../components/progressBar/ProgressBar'
import RecipeForm from '../components/recipeForm/RecipeForm'
import RecipeInformationsStep from '../components/recipeInformationsStep/RecipeInformationsStep'
import RecipeIngredientsStep from '../components/recipeIngredientsStep/RecipeIngredientsStep'
import RecipeInstructionsStep from '../components/recipeInstructionsStep/RecipeInstructionsStep'
import RecipeQuantitiesStep from '../components/recipeQuantitiesStep/RecipeQuantitiesStep'
import RecipeTagsStep from '../components/recipeTagsStep/RecipeTagsStep'
import FamilyService from '../services/FamilyService'
import RecipeService from '../services/RecipeService'
import TagService from '../services/TagService'
import UserService from '../services/UserService'
import {
  EDifficulty,
  ETimeUnit,
  IIngredient,
  IMeasurable,
  IRecipe,
  ITag,
} from '../types/recipe'
import { merge } from '../utils/arrayUtils'
import css from './add-recipe.module.scss'

export default function AddRecipe() {
  const router = useRouter()
  const { rid } = router.query
  const [recipe, setRecipe] = useState<IRecipe>(null)

  // ------------------------------------------------------------------- USE

  useEffect(() => {
    if (rid) {
      RecipeService.get(rid).then((reci) => console.log(reci))
      RecipeService.get(rid).then((reci) =>
        setRecipe({
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
          tags: reci.tags,
        })
      )
    }
  }, [rid])

  useEffect(() => {
    console.log(recipe)
  }, [recipe])

  // ------------------------------------------------------------------- METHODS

  // ------------------------------------------------------------------- RENDER

  return (
    <div className={css.root} style={{ padding: '100px 50px' }}>
      {recipe && <RecipeForm recipe={recipe} />}
    </div>
  )
}
