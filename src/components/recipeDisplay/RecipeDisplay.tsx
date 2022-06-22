import Image from 'next/image'
import { useEffect, useState } from 'react'
import RecipeService from '../../services/RecipeService'
import UserService from '../../services/UserService'
import { merge } from '../../utils/arrayUtils'
import { supabase } from '../../utils/supabaseClient'
import RecipeDisplayTabs from '../recipeDisplayTabs/RecipeDisplayTabs'
import css from './RecipeDisplay.module.scss'

export default function RecipeDisplay({ recipe }) {
  const [authorImageUrl, setAuthorImageUrl] = useState(null)
  const [recipeImageUrl, setRecipeImageUrl] = useState(null)
  const [author, setAuthor] = useState(null)

  useEffect(() => {
    if (recipe) {
      downloadRecipeImage(recipe.imageUrl)
      UserService.getUser(recipe.authorId).then((author) => setAuthor(author))
      console.log('recipe', recipe)
    }
  }, [recipe])

  useEffect(() => {
    if (author) {
      downloadAuthorImage(author.avatar_url)
    }
  }, [author])

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

  async function downloadAuthorImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAuthorImageUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  return (
    <div className={css.root}>
      {recipe && (
        <div className={css.container}>
          <div className={css.left}>
            {recipeImageUrl ? (
              <div className={css.visual}>
                <Image
                  src={recipeImageUrl}
                  alt={recipe.name}
                  layout={'fill'}
                  objectFit={'cover'}
                />
              </div>
            ) : (
              <div className={merge([css.image, css['no-image']])} />
            )}
            <span className={merge([css.label, css['label-difficulty']])}>
              {recipe.difficulty.label}
            </span>
          </div>
          <div className={css.right}>
            <h2 className={css.title}>{recipe.name}</h2>

            <div className={css.author}>
              {authorImageUrl ? (
                <Image
                  className={css.image}
                  src={authorImageUrl}
                  alt={author.username}
                  unoptimized={true}
                  width={40}
                  height={40}
                />
              ) : (
                <div className={merge([css.image, css['no-image']])} />
              )}
              {author && <h3 className={css.username}>{author.username}</h3>}
            </div>

            <div className={css.types}>
              <span className={merge([css.label, css['label-diet']])}>
                {recipe.diet.label}
              </span>
              <span className={merge([css.label, css['label-dish']])}>
                {recipe.dish.label}
              </span>
            </div>

            <div className={css.details}>
              <p className={css.detail}>
                <span>
                  Temps de préparation: {recipe.preparationTime.amount}{' '}
                  {recipe.preparationTime.unit}
                </span>
              </p>
              <p className={css.detail}>
                <span>
                  Temps de cuisson: {recipe.cookingTime.amount}{' '}
                  {recipe.cookingTime.unit}
                </span>
              </p>
              <p className={css.detail}>
                <span>Personnes: {recipe.peopleAmount}</span>
              </p>
            </div>

            <RecipeDisplayTabs
              ingredients={recipe.ingredients}
              instructions={recipe.instructions}
              notes={[]}
            />
          </div>
        </div>
      )}
    </div>
  )
}
