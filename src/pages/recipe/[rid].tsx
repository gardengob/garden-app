/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import RecipeDisplay from '../../components/recipeDisplay/RecipeDisplay'
import RippedPaper from '../../components/rippedPaper/RippedPaper'
import RecipeService from '../../services/RecipeService'
import { IRecipe } from '../../types/recipe'
import css from './[rid].module.scss'

const Recipe = () => {
  const router = useRouter()
  const { rid } = router.query
  const [recipe, setRecipe] = useState<IRecipe>(null)

  useEffect(() => {
    if (rid) {
      RecipeService.getRecipe(rid).then((reci) => setRecipe(reci))
    }
  }, [rid])

  useEffect(() => {
    console.log(recipe)
  }, [recipe])

  return (
    <div className={css.root}>
      {recipe && (
        <>
          <div className={css.head}>
            <Link href={`/recipes`}>
              <a className={css.back}>
                <img
                  className={css.icon}
                  src={`/images/icons/back.svg`}
                  alt=""
                />
              </a>
            </Link>

            <Link href={`/edit-recipe?rid=${recipe.id}`}>
              <a className={css.edit}>
                <img
                  className={css.icon}
                  src={`/images/icons/edit.svg`}
                  alt=""
                />
              </a>
            </Link>
          </div>
          <RecipeDisplay recipe={recipe} />
          <div className={css.ripped}>
            <RippedPaper />
          </div>
        </>
      )}
    </div>
  )
}

export default Recipe
