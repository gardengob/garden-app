import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import RecipeCard from '../../components/recipeCard/RecipeCard'
import RecipeService from '../../services/RecipeService'
import { IRecipe } from '../../types/recipe'
import css from './[rid].module.scss'

const Recipe = () => {
  const router = useRouter()
  const { rid } = router.query
  const [recipe, setRecipe] = useState<IRecipe>(null)

  useEffect(() => {
    if (rid) {
      RecipeService.get(rid).then((reci) => setRecipe(reci))
    }
  }, [rid])

  return (
    <div className={css.root}>
      <p className={css.p}>Recipe: {rid}</p>
      {recipe && <RecipeCard recipe={recipe} />}
    </div>
  )
}

export default Recipe
