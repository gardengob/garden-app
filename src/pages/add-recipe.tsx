import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useState } from 'react'
import ProgressBar from '../components/progressBar/ProgressBar'
import RecipeInformationsStep from '../components/recipeInformationsStep/RecipeInformationsStep'
import RecipeIngredientsStep from '../components/recipeIngredientsStep/RecipeIngredientsStep'
import RecipeInstructionsStep from '../components/recipeInstructionsStep/RecipeInstructionsStep'
import FamilyService from '../services/FamilyService'
import RecipeService from '../services/RecipeService'
import UserService from '../services/UserService'
import { ETimeUnit, IIngredients, IMeasurable, IRecipe } from '../types/recipe'
import { merge } from '../utils/arrayUtils'
import css from './add-recipe.module.scss'

const MAX_FORM_STEP = 3
const STARTING_RECIPE: IRecipe = {
  name: '',
  peopleAmount: 0,
  preparationTime: {
    amount: 0,
    unit: ETimeUnit.MINUTES,
  },
  cookingTime: {
    amount: 0,
    unit: ETimeUnit.HOURS,
  },
  ingredients: [],
  instructions: [],
  imageUrl: '',
}

export default function AddRecipe() {
  const router = useRouter()
  const [step, setStep] = useState<number>(1)

  // TODO: Ask yourselves if stocking this in localStorage is useful, maybe for keeping info when offline / refreshing ? Delete it when posting
  const [recipe, setRecipe] = useState<IRecipe>(STARTING_RECIPE)
  const [name, setName] = useState<string>(STARTING_RECIPE.name)
  const [peopleAmount, setPeopleAmount] = useState<number>(
    STARTING_RECIPE.peopleAmount
  )
  const [preparationTime, setPreparationTime] = useState<IMeasurable>(
    STARTING_RECIPE.preparationTime
  )
  const [cookingTime, setCookingTime] = useState<IMeasurable>(
    STARTING_RECIPE.cookingTime
  )
  const [ingredients, setIngredients] = useState<IIngredients[]>(
    STARTING_RECIPE.ingredients
  )
  const [instructions, setInstructions] = useState<string[]>(
    STARTING_RECIPE.instructions
  )
  const [imageUrl, setImageUrl] = useState<string>(STARTING_RECIPE.imageUrl)

  // ------------------------------------------------------------------- USE

  useEffect(() => {
    setRecipe({
      name,
      peopleAmount,
      preparationTime,
      cookingTime,
      ingredients,
      instructions,
      imageUrl,
    })
  }, [
    name,
    peopleAmount,
    preparationTime,
    cookingTime,
    ingredients,
    instructions,
    imageUrl,
  ])

  useEffect(() => {
    console.log(recipe)
  }, [recipe])

  // ------------------------------------------------------------------- METHODS

  const prevForm = (e) => {
    e.preventDefault()
    setStep((currentStep) => currentStep - 1)
  }

  const nextForm = (e) => {
    e.preventDefault()
    setStep((currentStep) => currentStep + 1)
  }

  const finishForm = (e) => {
    RecipeService.add(recipe, () => {
      setStep((currentStep) => currentStep + 1)
    })
  }

  // ------------------------------------------------------------------- RENDER

  return (
    <div className={css.root} style={{ padding: '100px 50px' }}>
      {/* <ProgressBar progress={progress} /> */}

      <div className={css.container}>
        <h2 className={css.title}>Créez votre recette</h2>

        {step === 1 && (
          <RecipeInformationsStep
            name={name}
            nameChange={(e) => setName(e.target.value)}
            peopleAmount={peopleAmount}
            peopleAmountChange={(amount) => {
              setPeopleAmount(amount)
            }}
            preparationTime={preparationTime}
            preparationTimeAmountChange={(e) =>
              setPreparationTime({ ...cookingTime, amount: e.target.value })
            }
            preparationTimeUnitChange={(e) =>
              setPreparationTime({ ...cookingTime, unit: e.target.value })
            }
            cookingTime={cookingTime}
            cookingTimeAmountChange={(e) =>
              setCookingTime({ ...cookingTime, amount: e.target.value })
            }
            cookingTimeUnitChange={(e) =>
              setCookingTime({ ...cookingTime, unit: e.target.value })
            }
          />
        )}
        {step === 2 && (
          <RecipeIngredientsStep
            ingredients={ingredients}
            ingredientsChange={(newIngredients) =>
              setIngredients(newIngredients)
            }
          />
        )}
        {step === 3 && (
          <RecipeInstructionsStep
            instructions={instructions}
            instructionsChange={(newInstructions) =>
              setInstructions(newInstructions)
            }
          />
        )}
        {step === MAX_FORM_STEP + 1 && (
          <div>
            <p className={css.congrats}>Vous avez ajouté une recette bravo !</p>
            <button
              className={css.btn}
              name="button"
              onClick={() => router.push('/recipes')}
            >
              Revenir aux recettes
            </button>
          </div>
        )}

        <div className={css.actions}>
          {step > 1 && step < MAX_FORM_STEP + 1 && (
            <button className={css.btn} name="button" onClick={prevForm}>
              Précédent
            </button>
          )}
          {step === MAX_FORM_STEP && (
            <button
              className={merge([css.btn, css['btn-finish']])}
              name="button"
              onClick={finishForm}
            >
              Terminer
            </button>
          )}
          {step < MAX_FORM_STEP && (
            <button className={css.btn} name="button" onClick={nextForm}>
              Suivant
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
