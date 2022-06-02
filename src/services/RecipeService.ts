import { IRecipe } from '../types/recipe'
import { supabase } from '../utils/supabaseClient'

class RecipeService {
  public async add(
    recipe: IRecipe,
    callback?: () => void
  ): Promise<void> {
    if (!recipe) return alert('Renseigner une recette')

    try {
      const user = supabase.auth.user()
      // We create the family with the asked name
      let { error } = await supabase.from('recipe').insert([
        {
          family_id: localStorage.getItem('family_id'),
          author_id: user.id,
          name: recipe.name,
          people_amount: recipe.peopleAmount,
          preparation_time: recipe.preparationTime,
          cooking_time: recipe.cookingTime,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
        },
      ])

      if (error) {
        throw error
      }
    } catch (error) {
      alert(`${error.message}`)
    } finally {
      if (callback) callback()
    }
  }

  public async store(recipe_name: string, callback?: () => void) {
    try {
      let { data, error } = await supabase
        .from('recipe')
        .select('*')
        .eq('name', recipe_name)

      const recipe = data[0]
      localStorage.setItem('recipe', JSON.stringify(recipe))

      if (error) {
        throw error
      }
    } catch (error) {
      alert(`${error.message}`)
    } finally {
      if (callback) callback()
    }
  }
}

export default new RecipeService()
