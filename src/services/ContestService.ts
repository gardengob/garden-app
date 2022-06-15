import { stringify } from 'querystring'
import {
  IFamilyContest,
  IContestCreationPayload,
  IContestUpdatePayload,
  IContestEntry,
} from '../types/contest'
import { supabase } from '../utils/supabaseClient'
import UserService from './UserService'

class ContestService {
  async getAll(): Promise<IFamilyContest[]> {
    try {
      let { error, data } = await supabase
        .from('family_contest')
        .select('*')
        .eq('family_id', localStorage.getItem('familyId'))
      return data
    } catch (error) {
      console.log('error', error)
    }
  }
  async get(contestId: string): Promise<IFamilyContest> {
    try {
      let { error, data } = await supabase
        .from('family_contest')
        .select(
          `*,
          family_contest_entry(
            *,
            family_contest_entry_vote(
              *
            )
          )`
        )

        .eq('family_id', localStorage.getItem('familyId'))
        .eq('id', contestId)
        .limit(1)
        .single()

      return data
    } catch (error) {
      console.log('error', error)
    }
  }

  async getCurrentContest(): Promise<IFamilyContest> {
    console.log(
      "localStorage.getItem('familyId')",
      localStorage.getItem('familyId')
    )
    try {
      let { error, data } = await supabase
        .from('family_contest')
        .select(
          `*,
          family_contest_entry(
            *,
            family_contest_entry_vote(
              *
            )
          )`
        )
        .eq('family_id', localStorage.getItem('familyId'))
        .eq('finished', false)
        .limit(1)
        .single()

      console.log('error', error)
      console.log('data', data)
      return data
    } catch (error) {
      console.log('error', error)
    }
  }

  async getFinishedContest(contestId: string): Promise<IFamilyContest[]> {
    try {
      let { error, data } = await supabase
        .from('family_contest')
        .select(
          `*,
          family_contest_entry(
            *,
            family_contest_entry_vote(
              *
            )
          )`
        )
        .eq('family_id', localStorage.getItem('familyId'))
        .eq('id', contestId)
        .eq('finished', true)

      return data
    } catch (error) {
      console.log('error', error)
    }
  }
  async getLastFinishedContest(): Promise<IFamilyContest> {
    try {
      let { error, data } = await supabase
        .from('family_contest')
        .select('*')
        .eq('family_id', localStorage.getItem('familyId'))
        .eq('finished', true)
        .order('created_at')
        .limit(1)
        .single()

      return data
    } catch (error) {
      console.log('error', error)
    }
  }

  async add(contest: IContestCreationPayload): Promise<void> {
    try {
      let { error, data } = await supabase
        .from('family_contest')
        .insert(contest)

      console.log(error)
    } catch (error) {
      console.log('error', error)
    }
  }
  async update(
    contestId: string,
    updateData: IContestUpdatePayload
  ): Promise<void> {
    try {
      let { error, data } = await supabase
        .from('family_contest')
        .update(updateData)
        .match({ id: contestId })
    } catch (error) {
      console.log('error', error)
    }
  }
  async participate(entry: IContestEntry): Promise<void> {
    try {
      let { error, data } = await supabase
        .from('family_contest_entry')
        .insert(entry)

      console.log(error)
    } catch (error) {
      console.log('error', error)
    }
  }
  async vote(entryId): Promise<void> {
    try {
      const familyUserId = UserService.getUserFamilyId()
      let { error, data } = await supabase
        .from('family_contest_entry_vote')
        .insert({
          contest_entry: entryId,
          family_user_id: familyUserId,
        })
        .neq('contest_entry', entryId)
        .neq('family_user_id', familyUserId)

      console.log(error)
    } catch (error) {
      console.log('error', error)
    }
  }

  async getEntries(contestId: string): Promise<IContestEntry[]> {
    try {
      let { error, data } = await supabase
        .from('family_contest_entry')
        .select('*')
        .eq('family_contest_id', contestId)

      console.log('errererer', error)
      return data
    } catch (error) {
      console.log('error', error)
    }
  }

  async getContestSubject(
    contest: IFamilyContest
  ): Promise<{ label: string; id: string; path: string; particle: 'string' }> {
    let subject
    const reducedContest = {
      recipe_id: {
        id: contest.recipe_id,
        label: 'recette',
        path: 'recipe',
        particle: 'la',
      },
      ingredient_id: {
        id: contest.ingredient_id,
        label: 'ingrédient',
        path: 'ingredients',
        particle: "l'",
      },
      theme_id: {
        id: contest.theme_id,
        label: 'thème',
        path: '',
        particle: '',
      },
    }

    for (const key in reducedContest) {
      const element = reducedContest[key]
      if (element !== null) {
        subject = element
        if (key == 'theme_id') {
          try {
            let theme = await supabase
              .from('family_contest_theme')
              .select('label')
              .eq('theme_id', contest.theme_id)
              .limit(1).single
            subject.label = theme
            subject.id = null
          } catch (error) {
            console.log('error', error)
          }
        }
        break
      }
    }

    return subject
  }

  async downloadEntryImage(entry: IContestEntry): Promise<string> {
    try {
      const { data, error } = await supabase.storage
        .from('finebouche')
        .download(entry.image)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      return url
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }
}

export default new ContestService()
