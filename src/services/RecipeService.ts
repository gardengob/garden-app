import { IRecipe, IRecipeTag, ITag } from '../types/recipe'
import { generateUUIDV4 } from '../utils/generateUUIDV4'
import { supabase } from '../utils/supabaseClient'
import FamilyService from './FamilyService'
import UserService from './UserService'

class RecipeService {
  public async addRecipe(
    recipe: IRecipe,
    callback?: () => void
  ): Promise<void> {
    if (!recipe) return alert('Renseigner une recette')

    const recipeId = generateUUIDV4()

    try {
      const user = supabase.auth.user()
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
        {
          recipe_id: recipeId,
          tag_id: recipe.dish.id,
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

  public async updateRecipe(
    recipe: IRecipe,
    callback?: () => void
  ): Promise<void> {
    if (!recipe) return alert('Renseigner une recette')

    try {
      const { error } = await supabase
        .from('recipe')
        .update({
          name: recipe.name,
          peopleAmount: recipe.peopleAmount,
          preparationTime: recipe.preparationTime,
          cookingTime: recipe.cookingTime,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions,
          imageUrl: recipe.imageUrl,
        })
        .eq('id', recipe.id)

      // Update les tags
      let tags: IRecipeTag[] = [
        {
          recipe_id: recipe.id,
          tag_id: recipe.difficulty.id,
        },
        {
          recipe_id: recipe.id,
          tag_id: recipe.diet.id,
        },
        {
          recipe_id: recipe.id,
          tag_id: recipe.dish.id,
        },
      ]

      recipe.tags.forEach((tag) => {
        tags.push({ recipe_id: recipe.id, tag_id: tag.id })
      })

      this.updateTags(recipe.id, tags)

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

  public async updateTags(
    recipeId: string,
    tags: IRecipeTag[],
    callback?: () => void
  ): Promise<void> {
    if (!tags) return alert('Renseigner des tags')

    try {
      // GET ALL TAGS IN BASE
      const baseTags = await supabase
        .from('recipe_tag')
        .select('*')
        .eq('recipe_id', recipeId)

      const tagsToInsert = []
      const tagsToDelete = []

      // DETERMINE ALL TAGS THAT MUST BE ADDED TO BASE
      tags.forEach((tag) => {
        const tagExistInBase = baseTags.data.some(
          (baseTag) => baseTag.tag_id === tag.tag_id
        )

        if (!tagExistInBase) {
          tagsToInsert.push(tag)
        }
      })

      // DETERMINE ALL TAGS THAT MUST BE DELETED FROM BASE
      baseTags.data.forEach((baseTag) => {
        const tagExistInApp = tags.some((tag) => tag.tag_id === baseTag.tag_id)

        if (!tagExistInApp) {
          tagsToDelete.push(baseTag.id)
        }
      })

      // DELETE & INSERT TAGS
      const insert_tags = await supabase.from('recipe_tag').insert(tagsToInsert)
      const delete_tags = await supabase
        .from('recipe_tag')
        .delete()
        .in('id', tagsToDelete)

      if (insert_tags.error || delete_tags.error) {
        throw (insert_tags.error, delete_tags.error)
      }
    } catch (error) {
      alert(`${error.message}`)
    } finally {
      if (callback) callback()
    }
  }

  public async getRecipe(recipe_id, callback?: () => void): Promise<IRecipe> {
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
        dish: await this.getDish(recipe_id),
        tags: await this.getTags(recipe_id),
        likes: await this.getLikes(recipe_id),
        dislikes: await this.getDislikes(recipe_id),
      }

      if (error) {
        throw error
      }
    } catch (error) {
      alert(`${error.message}`)
    } finally {
      if (callback) callback()
      return recipe
    }
  }

  public async getDiet(recipeId: string): Promise<ITag> {
    let dietTag
    try {
      const { data, error } = await supabase
        .from('recipe_tag')
        .select('*, tag!inner(*, tag_type!inner(*))')
        .eq('recipe_id', `${recipeId}`)
        .eq('tag.tag_type.label', 'diet')
        .single()

      if (data) {
        dietTag = {
          id: data.tag.id,
          label: data.tag.label,
          type_id: data.tag.type_id,
          family_id: data.tag.family_id,
        }
      }

      if (error) {
        console.log('ERROR DIET', error)
      }
    } catch (error) {
      alert(`${error.message}`)
    } finally {
      return dietTag
    }
  }

  public async getDish(recipeId: string): Promise<ITag> {
    let dishTag
    try {
      const { data, error } = await supabase
        .from('recipe_tag')
        .select('*, tag!inner(*, tag_type!inner(*))')
        .eq('recipe_id', `${recipeId}`)
        .eq('tag.tag_type.label', 'dish')

        .single()

      if (data) {
        dishTag = {
          id: data.tag.id,
          label: data.tag.label,
          type_id: data.tag.type_id,
          family_id: data.tag.family_id,
        }
      }

      if (error) {
        console.log('ERROR DISH', error)
      }
    } catch (error) {
      alert(`${error.message}`)
    } finally {
      return dishTag
    }
  }

  public async getDifficulty(recipeId: string): Promise<ITag> {
    let difficultyTag
    try {
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
    let tags = []
    try {
      const { data, error } = await supabase
        .from('recipe_tag')
        .select('*, tag!inner(*, tag_type!inner(*))')
        .eq('recipe_id', `${recipeId}`)
        .eq('tag.tag_type.label', 'default')

      data.forEach((el) => {
        tags.push({
          id: el.tag.id,
          label: el.tag.label,
          type_id: el.tag.type_id,
          family_id: el.tag.family_id,
        })
      })
    } catch (error) {
      alert(`${error.message}`)
    } finally {
      return tags
    }
  }

  public async searchRecipe(searchString: string): Promise<IRecipe[]> {
    try {
      console.log('searchString', searchString)
      const { data, error } = await supabase
        .from('recipe')
        .select()
        .eq('familyId', localStorage.getItem('familyId'))
        .ilike('name', '%' + searchString + '%')

      console.log('data', data)
      console.log('error', error)

      return data
    } catch (error) {
      alert(`${error.message}`)
    }
  }

  public async getTagRecipe(tagId: string): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('recipe_tag')
        .select('*, recipe!inner(id)')
        .eq('recipe.familyId', localStorage.getItem('familyId'))
        .eq('tag_id', tagId)

      console.log('data', data)
      console.log('error', error)

      return data
    } catch (error) {
      alert(`${error.message}`)
    }
  }

  public async likeRecipe(recipeId: string): Promise<void> {
    try {
      const userFamilyId = await UserService.getUserFamilyId()
      console.log('userFamilyId', userFamilyId)
      console.log('recipeId', recipeId)

      const { data, error } = await supabase
        .from('recipe_user')
        .select('id,taste')
        .eq('recipe_id', recipeId)
        .eq('user_family_id', userFamilyId)
        .limit(1)
        .single()

      if (data) {
        if (data.taste !== 'LIKE') {
          const update = await supabase
            .from('recipe_user')
            .update({ taste: 'LIKE' })
            .match({ id: data.id })
        } else {
          const deleteLikes = await supabase
            .from('recipe_user')
            .delete()
            .match({ id: data.id })
        }
      } else {
        const insert = await supabase.from('recipe_user').insert({
          taste: 'LIKE',
          recipe_id: recipeId,
          user_family_id: userFamilyId,
        })
      }
      console.log('data', data)
      console.log('error', error)
    } catch (error) {
      alert(`${error.message}`)
    }
  }

  public async dislikeRecipe(recipeId: string): Promise<void> {
    try {
      const userFamilyId = await UserService.getUserFamilyId()
      console.log('userFamilyId', userFamilyId)
      console.log('recipeId', recipeId)

      const { data, error } = await supabase
        .from('recipe_user')
        .select('id,taste')
        .eq('recipe_id', recipeId)
        .eq('user_family_id', userFamilyId)
        .limit(1)
        .single()

      if (data) {
        if (data.taste !== 'DISLIKE') {
          console.log('update', data)
          const update = await supabase
            .from('recipe_user')
            .update({ taste: 'DISLIKE' })
            .match({ id: data.id })
        } else {
          console.log('delete', data.taste)

          const deleteDislikes = await supabase
            .from('recipe_user')
            .delete()
            .match({ id: data.id })
        }
      } else {
        const insert = await supabase.from('recipe_user').insert({
          taste: 'DISLIKE',
          recipe_id: recipeId,
          user_family_id: userFamilyId,
        })
      }
      console.log('data', data)
      console.log('error', error)
    } catch (error) {
      alert(`${error.message}`)
    }
  }
  public async getLikes(
    recipeId: string
  ): Promise<{ user_id: string; avatar_url: string }[]> {
    try {
      let { data, error } = await supabase
        .from('recipe_user')
        .select('user_family_id,user_family(user_id,user(avatar_url))')
        .eq('recipe_id', recipeId)
        .eq('taste', 'LIKE')

      return data.map((row) => {
        console.log('row', row)
        return {
          user_id: row.user_family.user_id,
          avatar_url: row.user_family.user.avatar_url,
        }
      })
    } catch (error) {}
  }

  public async getDislikes(
    recipeId: string
  ): Promise<{ user_id: string; avatar_url: string }[]> {
    try {
      let { data, error } = await supabase
        .from('recipe_user')
        .select('user_family_id,user_family(user_id,user(avatar_url))')
        .eq('recipe_id', recipeId)
        .eq('taste', 'DISLIKE')

      return data.map((row) => {
        console.log('row', row)
        return {
          user_id: row.user_family.user_id,
          avatar_url: row.user_family.user.avatar_url,
        }
      })
    } catch (error) {}
  }
}

export default new RecipeService()
