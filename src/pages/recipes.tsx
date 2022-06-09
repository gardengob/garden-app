import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useLayoutEffect, useState } from 'react'
import RecipeCard from '../components/recipeCard/RecipeCard'
import FamilyService from '../services/FamilyService'
import RecipeService from '../services/RecipeService'
import { IRecipe } from '../types/recipe'
import { supabase } from '../utils/supabaseClient'
import css from './recipes.module.scss'

export default function Recipes() {
  const router = useRouter()
  const [recipes, setRecipes] = useState([])
  const [isConsulting, setIsConsulting] = useState(false)
  const [currentRecipe, setCurrentRecipe] = useState<IRecipe>(null)

  useEffect(() => {
    const subscription = supabase
      .from('user_family')
      .on('*', (payload) => {
        FamilyService.getRecipes(localStorage.getItem('familyId')).then(
          (families) => setRecipes(families)
        )
      })
      .subscribe()

    FamilyService.getRecipes(localStorage.getItem('familyId')).then(
      (familyRecipes) => setRecipes(familyRecipes)
    )

    return () => {
      supabase.removeSubscription(subscription)
    }
  }, [])

  useEffect(() => {
    console.log(recipes)
  }, [recipes])

  useEffect(() => {
    console.log(currentRecipe)
  }, [currentRecipe])

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
            <Link key={i} href={`/recipe/${item.id}`}>
              <a className={css.recipe}>{item.name}</a>
            </Link>
          )
        })}
      </div>

      <div className={css.column}>
        {isConsulting && <RecipeCard recipe={currentRecipe} />}
      </div>
    </div>
  )
}
