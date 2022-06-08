import { IRecipe, IRecipeTag, ITag } from '../types/recipe'
import { generateUUIDV4 } from '../utils/generateUUIDV4'
import { supabase } from '../utils/supabaseClient'

class RecipeService {
  public async add(recipe: IRecipe, callback?: () => void): Promise<void> {
    if (!recipe) return alert('Renseigner une recette')

    const recipe_id = generateUUIDV4()
    const preparation_time = `${recipe.preparationTime.amount} ${recipe.preparationTime.unit}`
    const cooking_time = `${recipe.cookingTime.amount} ${recipe.cookingTime.unit}`

    try {
      const user = supabase.auth.user()
      // We create the family with the asked name
      let { error } = await supabase.from('recipe').insert([
        {
          id: recipe_id,
          family_id: localStorage.getItem('family_id'),
          author_id: user.id,
          name: recipe.name,
          people_amount: recipe.peopleAmount,
          preparation_time,
          cooking_time,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
        },
      ])

      let tags: IRecipeTag[] = [
        {
          recipe_id,
          tag_id: recipe.difficulty.id,
        },
        {
          recipe_id,
          tag_id: recipe.diet.id,
        },
      ]

      recipe.tags.forEach((tag) => {
        tags.push({ recipe_id, tag_id: tag.id })
      })

      this.addTags(tags)

      if (error) {
        throw error
      }
    } catch (error) {
      alert(`${error.message}`)
    } finally {
      if (callback) callback()
    }
  }

  public async addTags(tags: IRecipeTag[], callback?: () => void): Promise<void> {
    if (!tags) return alert('Renseigner des tags')

    try {
      let { error } = await supabase.from('recipe_tag').insert(tags)

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
