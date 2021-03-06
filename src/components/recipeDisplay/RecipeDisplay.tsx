/* eslint-disable @next/next/no-img-element */
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
              <Image
                className={css.image}
                src={recipeImageUrl}
                alt={recipe.name}
                layout={'responsive'}
                width={380}
                height={280}
              />
            ) : (
              <div className={merge([css.image, css['no-image']])} />
            )}
            <span className={merge([css.label, css['label-difficulty']])}>
              {recipe.difficulty.label}
            </span>
            <div className={css.stars}>
              <Image
                src={'/images/ui/stars.png'}
                alt={'??toiles'}
                width={210}
                height={230}
              />
            </div>
            <div className={css.likesdislikes}>
              <p className={merge([css.likedislike, css['likedislike-love']])}>
                Adrien adore
                <img className={css.icon} src="/images/icons/like.svg" alt="" />
              </p>
              <p className={merge([css.likedislike, css['likedislike-love']])}>
                St??phane adore
                <img className={css.icon} src="/images/icons/like.svg" alt="" />
              </p>
              <p className={merge([css.likedislike, css['likedislike-hate']])}>
                S??bastien n???est pas fan
                <img className={css.icon} src="/images/icons/nope.svg" alt="" />
              </p>
              <p className={merge([css.likedislike, css['likedislike-hate']])}>
                Carine n???est pas fan
                <img className={css.icon} src="/images/icons/nope.svg" alt="" />
              </p>
              <p className={merge([css.likedislike, css['likedislike-love']])}>
                Rapha??lle adore
                <img className={css.icon} src="/images/icons/like.svg" alt="" />
              </p>
              <p className={merge([css.likedislike, css['likedislike-love']])}>
                Camille adore
                <img className={css.icon} src="/images/icons/like.svg" alt="" />
              </p>
            </div>
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

            <div className={css.relations}>
              <div className={css.types}>
                <span className={merge([css.label, css['label-diet']])}>
                  {recipe.diet.label}
                </span>
                <span className={merge([css.label, css['label-dish']])}>
                  {recipe.dish.label}
                </span>
              </div>

              <div className={css.rapports}>
                <button
                  className={merge([css.rapport, css['rapport-love']])}
                  onClick={() => {
                    RecipeService.likeRecipe(recipe.id)
                  }}
                >
                  <img
                    className={css.icon}
                    src="/images/icons/love.svg"
                    alt=""
                  />
                </button>
                <button
                  className={merge([css.rapport, css['rapport-hate']])}
                  onClick={() => {
                    RecipeService.dislikeRecipe(recipe.id)
                  }}
                >
                  <img
                    className={css.icon}
                    src="/images/icons/hate.svg"
                    alt=""
                  />
                </button>
              </div>
            </div>

            <div className={css.details}>
              <p className={css.detail}>
                Temps de pr??paration: {recipe.preparationTime.amount}{' '}
                {recipe.preparationTime.unit}
              </p>
              <p className={css.detail}>
                Temps de cuisson: {recipe.cookingTime.amount}{' '}
                {recipe.cookingTime.unit}
              </p>
              <p className={css.detail}>Personnes: {recipe.peopleAmount}</p>
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
