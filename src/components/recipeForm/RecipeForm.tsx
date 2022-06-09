import css from './RecipeForm.module.scss'
import { useEffect, useState } from 'react'
import RecipeInstructionsStep from '../recipeInstructionsStep/RecipeInstructionsStep'
import RecipeQuantitiesStep from '../recipeQuantitiesStep/RecipeQuantitiesStep'
import RecipeIngredientsStep from '../recipeIngredientsStep/RecipeIngredientsStep'
import RecipeTagsStep from '../recipeTagsStep/RecipeTagsStep'
import RecipeInformationsStep from '../recipeInformationsStep/RecipeInformationsStep'
import RecipeService from '../../services/RecipeService'
import { useRouter } from 'next/router'
import { IIngredient, IMeasurable, IRecipe, ITag } from '../../types/recipe'
import TagService from '../../services/TagService'
import { merge } from '../../utils/arrayUtils'

const MAX_FORM_STEP = 5

export default function RecipeForm({ recipe }) {
  const router = useRouter()
  const [step, setStep] = useState<number>(1)

  // TODO: Ask yourselves if stocking this in localStorage is useful, maybe for keeping info when offline / refreshing ? Delete it when posting
  const [formRecipe, setFormRecipe] = useState<IRecipe>(recipe)
  const [name, setName] = useState<string>(recipe.name)
  const [peopleAmount, setPeopleAmount] = useState<number>(recipe.peopleAmount)
  const [preparationTime, setPreparationTime] = useState<IMeasurable>(
    recipe.preparationTime
  )
  const [cookingTime, setCookingTime] = useState<IMeasurable>(
    recipe.cookingTime
  )
  const [ingredients, setIngredients] = useState<IIngredient[]>(
    recipe.ingredients
  )
  const [instructions, setInstructions] = useState<string[]>(
    recipe.instructions
  )
  const [imageUrl, setImageUrl] = useState<string>(recipe.imageUrl)

  const [difficulty, setDifficulty] = useState<ITag>(recipe.difficulty)

  const [diet, setDiet] = useState<ITag>(recipe.diet)

  const [tags, setTags] = useState<ITag[]>(recipe.tags)

  // ------------------------------------------------------------------- USE

  useEffect(() => {
    TagService.getAll()
  }, [])

  useEffect(() => {
    setFormRecipe({
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
    RecipeService.add(formRecipe, () => {
      setStep((currentStep) => currentStep + 1)
    })
  }

  // ------------------------------------------------------------------- RENDER

  return (
    <div className={css.root}>
      <p>RecipeForm</p>
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
            imageUrl={imageUrl}
            imageUrlChange={(url) => setImageUrl(url)}
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