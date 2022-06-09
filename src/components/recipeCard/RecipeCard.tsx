import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IRecipe } from '../../types/recipe'
import { supabase } from '../../utils/supabaseClient'
import css from './RecipeCard.module.scss'

export default function RecipeCard({ recipe }) {
  const [recipeImageUrl, setRecipeImageUrl] = useState(null)

  useEffect(() => {
    console.log("RECIPE", recipe)
    if (recipe) downloadRecipeImage(recipe.imageUrl)
  }, [recipe])

  async function downloadRecipeImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from('finebouche')
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setRecipeImageUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  return (
    <div className={css.root}>
      {recipe && (
        <div>
          <h2 className={css.title}>{recipe.name}</h2>
          <div className={css.details}>
            {recipeImageUrl && (
              <Image
                className={css.image}
                src={recipeImageUrl}
                alt={recipe.name}
                unoptimized={true}
                width={500}
                height={200}
              />
            )}
            <p className={css.detail}>
              <label>Personnes:</label> {recipe.people_amount}
            </p>
            <p className={css.detail}>
              <label>Temps de préparation:</label> {recipe.preparation_time}
            </p>
            <p className={css.detail}>
              <label>Temps de cuisson:</label> {recipe.cooking_time}
            </p>
          </div>

          <div className={css.ingredients}>
            <label>Ingrédients</label>
            {recipe.ingredients.map(function (item, i) {
              return (
                <li key={i}>
                  {item.name} {item.amount} {item.unit}
                </li>
              )
            })}
          </div>

          <div className={css.instructions}>
            <label>Étapes</label>
            {recipe.instructions.map(function (item, i) {
              return <li key={i}>{item}</li>
            })}
          </div>
          <Link href={`/edit-recipe?rid=${recipe.id}`}>
            <a>edit</a>
          </Link>
        </div>
      )}
    </div>
  )
}
