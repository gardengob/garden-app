import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useState } from 'react'
import RecipeCard from '../components/recipeCard/RecipeCard'
import FamilyService from '../services/FamilyService'
import RecipeService from '../services/RecipeService'
import UserService from '../services/UserService'
import { supabase } from '../utils/supabaseClient'
import css from './recipes.module.scss'

export default function Recipes() {
  const router = useRouter()
  const [recipes, setRecipes] = useState([])
  const [isConsulting, setIsConsulting] = useState(false)
  const [currentRecipe, setCurrentRecipe] = useState(null)

  useEffect(() => {
    if (currentRecipe) console.log(currentRecipe)
  }, [currentRecipe])

  useEffect(() => {
    FamilyService.getRecipes(localStorage.getItem('family_id'))

    const subscription = supabase
      .from('user_family')
      .on('*', (payload) => {
        FamilyService.getRecipes(localStorage.getItem('family_id')).then(
          (families) => setRecipes(families)
        )
      })
      .subscribe()

    FamilyService.getRecipes(localStorage.getItem('family_id')).then(
      (families) => setRecipes(families)
    )

    return () => {
      supabase.removeSubscription(subscription)
    }
  }, [])

  const clickRecipeHandler = (recipe) => {
    RecipeService.store(recipe.name, () => {
      setCurrentRecipe(JSON.parse(localStorage.getItem('recipe')))
    })
    setIsConsulting(true)
  }

  return (
    <div className={css.root} style={{ padding: '100px 50px' }}>
      <div className={css.column}>
        <div className={css.head}>
          <label>Recettes</label>
          <button onClick={() => router.push('/add-recipe')}>
            Créer une recette
          </button>
        </div>

        {recipes.map(function (item, i) {
          return (
            <li
              className={css.recipe}
              key={i}
              onClick={() => clickRecipeHandler(item)}
            >
              {item.name}
            </li>
          )
        })}
      </div>

      <div className={css.column}>
        {isConsulting && <RecipeCard recipe={currentRecipe} />}
      </div>
    </div>
  )
}
