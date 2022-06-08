import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useState } from 'react'
import ProgressBar from '../components/progressBar/ProgressBar'
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

const MAX_FORM_STEP = 5
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
  difficulty: {
    id: 'ab7f3f15-7736-4a52-8739-42ffa00468b0',
    label: 'Moyen',
    type_id: 'ebc4b03d-6876-4ea2-a1a5-1801cca03540',
    family_id: null,
  },
  diet: {
    id: '365c5dc1-1b78-4ac1-9733-ca8a5f995c8f',
    label: 'Omnivore',
    type_id: 'be47f87b-b0aa-4308-828b-673a45f03edb',
    family_id: null,
  },
  tags: [
    {
      family_id: '22d38158-427c-42e6-929a-748c4689a782',
      id: '3e85a7e6-d230-4386-bfd5-72706d7c6757',
      label: 'Bon pour le corps',
      type_id: '8dc1dc16-ea42-4783-81cf-8dcd036d39c9',
    },
  ],
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
  const [ingredients, setIngredients] = useState<IIngredient[]>(
    STARTING_RECIPE.ingredients
  )
  const [instructions, setInstructions] = useState<string[]>(
    STARTING_RECIPE.instructions
  )
  const [imageUrl, setImageUrl] = useState<string>(STARTING_RECIPE.imageUrl)

  const [difficulty, setDifficulty] = useState<ITag>(STARTING_RECIPE.difficulty)

  const [diet, setDiet] = useState<ITag>(STARTING_RECIPE.diet)

  const [tags, setTags] = useState<ITag[]>(STARTING_RECIPE.tags)
  // ------------------------------------------------------------------- USE

  useEffect(() => {
    TagService.getAll()
  }, [])

  useEffect(() => {
    setRecipe({
      name,
      peopleAmount,
      preparationTime,
      cookingTime,
      ingredients,
      instructions,
      imageUrl,
      difficulty,
      diet,
      tags,
    })
  }, [
    name,
    peopleAmount,
    preparationTime,
    cookingTime,
    ingredients,
    instructions,
    imageUrl,
    difficulty,
    diet,
    tags,
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
            peopleAmountChange={(amount) => setPeopleAmount(amount)}
            preparationTime={preparationTime}
            preparationTimeAmountChange={(e) =>
              setPreparationTime({ ...preparationTime, amount: e.target.value })
            }
            preparationTimeUnitChange={(e) =>
              setPreparationTime({ ...preparationTime, unit: e.target.value })
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
          <RecipeTagsStep
            difficulty={difficulty}
            difficultyChange={(dif) => setDifficulty(dif)}
            diet={diet}
            dietChange={(dt) => setDiet(dt)}
            tags={tags}
            tagsChange={(newTags) => setTags(newTags)}
          />
        )}
        {step === 3 && (
          <RecipeIngredientsStep
            ingredients={ingredients}
            ingredientsChange={(newIngredients) =>
              setIngredients(newIngredients)
            }
          />
        )}
        {step === 4 && (
          <RecipeQuantitiesStep
            ingredients={ingredients}
            ingredientsQuantitiesChange={(newIngredientsQuantities) =>
              setIngredients(newIngredientsQuantities)
            }
          />
        )}
        {step === 5 && (
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
