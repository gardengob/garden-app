/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import RecipeForm, {
  ERecipeFormMode,
} from '../components/recipeForm/RecipeForm'
import RippedPaper from '../components/rippedPaper/RippedPaper'
import { ETimeUnit, IRecipe } from '../types/recipe'
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
  dish: {
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
    <div className={css.root}>
      <div className={css.ripped}>
        <RippedPaper reverse={true} />
      </div>
      <Link href={`/recipes`}>
        <a className={css.back}>
          <img className={css.icon} src={`/images/icons/back.svg`} alt="" />
        </a>
      </Link>
      <h1 className={css.title}>Création d'une recette</h1>
      <RecipeForm recipe={STARTING_RECIPE} mode={ERecipeFormMode.ADD} />
    </div>
  )
}
