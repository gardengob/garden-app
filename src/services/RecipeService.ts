import { IRecipe, IRecipeTag, ITag } from '../types/recipe'
import { generateUUIDV4 } from '../utils/generateUUIDV4'
import { supabase } from '../utils/supabaseClient'

class RecipeService {
  public async add(recipe: IRecipe, callback?: () => void): Promise<void> {
    if (!recipe) return alert('Renseigner une recette')

    const recipeId = generateUUIDV4()

    try {
      const user = supabase.auth.user()
      // We create the family with the asked name
      let { error } = await supabase.from('recipe').insert([
        {
          id: recipeId,
          familyId: localStorage.getItem('familyId'),
          authorId: user.id,
          name: recipe.name,
          peopleAmount: recipe.peopleAmount,
          preparationTime: recipe.preparationTime,
          cookingTime: recipe.cookingTime,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          imageUrl: recipe.imageUrl,
        },
      ])

      let tags: IRecipeTag[] = [
        {
          recipe_id: recipeId,
          tag_id: recipe.difficulty.id,
        },
        {
          recipe_id: recipeId,
          tag_id: recipe.diet.id,
        },
      ]

      recipe.tags.forEach((tag) => {
        tags.push({ recipe_id: recipeId, tag_id: tag.id })
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

  public async addTags(
    tags: IRecipeTag[],
    callback?: () => void
  ): Promise<void> {
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

  public async store(recipeName: string, callback?: () => void) {
    try {
      let { data, error } = await supabase
        .from('recipe')
        .select('*')
        .eq('name', recipeName)

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

  public async get(recipe_id, callback?: () => void): Promise<IRecipe> {
    let recipe: IRecipe
    try {
      let { data, error } = await supabase
        .from('recipe')
        .select('*')
        .eq('id', recipe_id)
        .single()

      recipe = {
          id: data.id,
          familyId: data.familyId,
          authorId: data.authorId,
          name: data.name,
          peopleAmount: data.peopleAmount,
          preparationTime: data.preparationTime,
          cookingTime: data.cookingTime,
          ingredients: data.ingredients,
          instructions: data.instructions,
          imageUrl: data.imageUrl,
          difficulty: await this.getDifficulty(recipe_id),
          diet: await this.getDiet(recipe_id),
          tags: []
      }

      if (error) {
        throw error
      }
    } catch (error) {
      alert(`${error.message}`)
    } finally {
      console.log(recipe)
      if (callback) callback()
      return recipe
    }
  }

  public async getDiet(recipeId: string): Promise<ITag> {
    let dietTag
    try {
      // First we get the id of diet tags
      const { data, error } = await supabase
      .from('recipe_tag')
      .select('*, tag!inner(*, tag_type!inner(*))')
      .eq('recipe_id', `${recipeId}`)
      .eq('tag.tag_type.label', 'diet')
      .single()

      dietTag = {
        id: data.tag.id,
        label: data.tag.label,
        type_id: data.tag.type_id,
        family_id: data.tag.family_id,
      }

    } catch (error) {
      alert(`${error.message}`)
    } finally {
      return dietTag
    }
  }

  public async getDifficulty(recipeId: string): Promise<ITag> {
    let difficultyTag
    try {
      // First we get the id of diet tags
      const { data, error } = await supabase
      .from('recipe_tag')
      .select('*, tag!inner(*, tag_type!inner(*))')
      .eq('recipe_id', `${recipeId}`)
      .eq('tag.tag_type.label', 'difficulty')
      .single()

      difficultyTag = {
        id: data.tag.id,
        label: data.tag.label,
        type_id: data.tag.type_id,
        family_id: data.tag.family_id,
      }

    } catch (error) {
      alert(`${error.message}`)
    } finally {
      return difficultyTag
    }
  }

  public async getTags(recipeId: string): Promise<ITag[]> {
    try {

    } catch (error) {
      alert(`${error.message}`)
    } finally {
      return
    }
  }
}

export default new RecipeService()
