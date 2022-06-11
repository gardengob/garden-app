import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import FamilyService from '../services/FamilyService'
import { supabase } from '../utils/supabaseClient'
import css from './recipes.module.scss'

export default function Recipes() {
  const router = useRouter()
  const [recipes, setRecipes] = useState([])

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
    </div>
  )
}
