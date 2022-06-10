import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useState } from 'react'
import ProgressBar from '../components/progressBar/ProgressBar'
import RecipeForm, { ERecipeFormMode } from '../components/recipeForm/RecipeForm'
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

const STARTING_RECIPE: IRecipe = {
  familyId: '',
  authorId: '',
  name: '',
  peopleAmount: 0,
  preparationTime: {
    amount: 0,
    unit: ETimeUnit.MINUTES,
  },
  cookingTime: {
    amount: 0,
    unit: ETimeUnit.MINUTES,
  },
  ingredients: [],
  instructions: [],
  imageUrl: '',
  difficulty: {
    id: '',
    label: '',
    type_id: '',
    family_id: '',
  },
  diet: {
    id: '',
    label: '',
    type_id: '',
    family_id: '',
  },
  tags: [],
}

export default function AddRecipe() {
  // ------------------------------------------------------------------- USE

  // ------------------------------------------------------------------- METHODS

  // ------------------------------------------------------------------- RENDER

  return (
    <div className={css.root} style={{ padding: '100px 50px' }}>
      {/* <ProgressBar progress={progress} /> */}

      <RecipeForm recipe={STARTING_RECIPE} mode={ERecipeFormMode.ADD}  />
    </div>
  )
}
