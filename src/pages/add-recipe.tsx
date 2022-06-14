/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import RecipeForm, {
  ERecipeFormMode,
} from '../components/recipeForm/RecipeForm'
import RippedPaper from '../components/rippedPaper/RippedPaper'
import UiService from '../services/events/UiService'
import { ETimeUnit, IRecipe } from '../types/recipe'
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
  const router = useRouter()
  // ------------------------------------------------------------------- METHODS

  // ------------------------------------------------------------------- RENDER

  return (
    <div className={merge([css.root, 'garden-ui'])}>
      <div className={css.ripped}>
        <RippedPaper reverse={true} />
      </div>
      <button
        onClick={() => {
          router.push('recipes')
          UiService.toggleUi('recipe')
        }}
      >
        <a className={css.back}>
          <img className={css.icon} src={`/images/icons/back.svg`} alt="" />
        </a>
      </button>
      <h1 className={css.title}>Création d'une recette</h1>
      <RecipeForm recipe={STARTING_RECIPE} mode={ERecipeFormMode.ADD} />
    </div>
  )
}
