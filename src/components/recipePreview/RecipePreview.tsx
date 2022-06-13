import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
import css from './RecipePreview.module.scss'

export default function RecipePreview({ recipe }) {
  const [recipeImageUrl, setRecipeImageUrl] = useState(null)

  useEffect(() => {
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
        <Link href={`/recipe/${recipe.id}`}>
          <a>
            <div className={css.details}>
              {recipeImageUrl && (
                <div className={css.image}>
                  <Image
                    src={recipeImageUrl}
                    alt={recipe.name}
                    width={200}
                    height={200}
                    objectFit={"cover"}
                    layout={"responsive"}
                  />
                </div>
              )}
            </div>
            <h3 className={css.title}>{recipe.name}</h3>
          </a>
        </Link>
      )}
    </div>
  )
}
