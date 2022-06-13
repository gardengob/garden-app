import { ITag } from '../types/recipe'
import { supabase } from '../utils/supabaseClient'

class TagService {
  public async add(label: string, callback?: () => void): Promise<void> {
    if (!label) return alert('Renseigner un label')

    try {

    } catch (error) {
      alert(`${error.message}`)
    } finally {
      if (callback) callback()
    }
  }

  public async getDiets(): Promise<ITag[]> {
    let id
    try {
      // First we get the id of diet tags
      let { data } = await supabase
        .from('tag_type')
        .select('id, label')
        .eq('label', 'diet')
      id = data[0].id
    } catch (error) {
      alert(`${error.message}`)
    } finally {
      // Then we get all diet tags and return them
      let { data } = await supabase
        .from('tag')
        .select('id, label, type_id, family_id')
        .eq('type_id', id)
      return data
    }
  }

  public async getDifficulties(): Promise<ITag[]> {
    let id
    try {
      // First we get the id of difficulty tags
      let { data } = await supabase
        .from('tag_type')
        .select('id, label')
        .eq('label', 'difficulty')
      id = data[0].id
    } catch (error) {
      alert(`${error.message}`)
    } finally {
      // Then we get all difficulty tags and return them
      let { data } = await supabase
        .from('tag')
        .select('id, label, type_id, family_id')
        .eq('type_id', id)

      return data
    }
  }

  public async getDishes(): Promise<ITag[]> {
    let id
    try {
      // First we get the id of difficulty tags
      let { data } = await supabase
        .from('tag_type')
        .select('id, label')
        .eq('label', 'dish')
      id = data[0].id
    } catch (error) {
      alert(`${error.message}`)
    } finally {
      // Then we get all difficulty tags and return them
      let { data } = await supabase
        .from('tag')
        .select('id, label, type_id, family_id')
        .eq('type_id', id)

      return data
    }
  }

  public async getAll(): Promise<ITag[]> {
    const familyId = localStorage.getItem('familyId')
    let id
    try {
      // First we get the id of default tags
      let { data } = await supabase
        .from('tag_type')
        .select('id, label')
        .eq('label', 'default')
      id = data[0].id
    } catch (error) {
      alert(`${error.message}`)
    } finally {
      // Then we get all diet tags and return them
      let { data } = await supabase
        .from('tag')
        .select('id, label, type_id, family_id')
        .eq('type_id', id)
        .or(`family_id.eq.${familyId},family_id.is.${null}`)

      return data
    }
  }
}

export default new TagService()
