import { generateCode } from '../utils/generateCode'
import { supabase } from '../utils/supabaseClient'

class FamilyService {
  public async getAll(): Promise<any[]> {
    try {
      let { data } = await supabase.from('family').select(`name`)

      if (data) {
        return data
      }
    } catch (error) {
      alert(error.message)
    }
  }

  public async join(family_code: string, callback?: () => void): Promise<void> {
    if (!family_code) return alert('Renseigner un code')
    try {
      let { data } = await supabase
        .from('family')
        .select('id')
        .eq('joining_code', family_code)

      const user_id = supabase.auth.user().id
      // TODO: Créer un utils pour reformater correctment les résultats de fetch
      const family_id = data[0].id

      let { error } = await supabase.from('user_family').insert([
        {
          user_id: user_id,
          family_id: family_id,
        },
      ])

      if (error) {
        throw error
      }
    } catch (error) {
      alert(`${error.message}`)
    } finally {
      callback()
    }
  }

  public async create(
    family_name: string,
    callback?: () => void
  ): Promise<void> {
    if (!family_name) return alert('Renseigner un nom')

    const family_code = generateCode()

    try {
      // We create the family with the asked name
      let { error } = await supabase.from('family').insert([
        {
          name: family_name,
          joining_code: family_code,
        },
      ])

      if (error) {
        throw error
      }
    } catch (error) {
      alert(`${error.message}`)
    } finally {
      // Then we make the current user join this exact same family
      this.join(family_code)
      callback()
    }
  }

  public async store(family_name: string) {
    try {
      let { data, error } = await supabase
        .from('family')
        .select('id')
        .eq('name', family_name)

      const user_id = supabase.auth.user().id
      // TODO: Créer un utils pour reformater correctment les résultats de fetch
      const family_id = data[0].id

      localStorage.setItem('family_id', family_id)

      if (error) {
        throw error
      }
    } catch (error) {
      alert(`${error.message}`)
    }
  }

  public async getRecipes(family_id) {
    try {
      let { data, error, status } = await supabase
        .from('recipe')
        .select(`*`)
        .eq('family_id', family_id)

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        return data
      }
    } catch (error) {
      alert(error.message)
    }
  }
}

export default new FamilyService()
