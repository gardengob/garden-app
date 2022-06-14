import { supabase } from '../utils/supabaseClient'

class UserService {
  public async getProfile() {
    try {
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('user')
        .select(`username, avatar_url`)
        .eq('id', user.id)
        .single()

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

  public async getUserFamilyId(): Promise<string> {
    try {
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('user_family')
        .select(`id`)
        .eq('user_id', user.id)
        .eq('family_id', localStorage.getItem('family_id'))
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        return data.id
      }
    } catch (error) {
      alert(error.message)
    }
  }

  public async updateProfile({ username, avatar_url }) {
    try {
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        username,
        avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('user').upsert(updates, {
        returning: 'minimal',
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    }
  }

  public async getUser(userId) {
    try {
      let { data, error, status } = await supabase
        .from('user')
        .select(`username, avatar_url`)
        .eq('id', userId)
        .single()
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

  public async getFamilies(): Promise<any[]> {
    try {
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('user_family')
        .select(`family:family_id (name)`)
        .eq('user_id', user.id)

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

export default new UserService()
