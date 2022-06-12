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
        .eq('family_id', localStorage.getItem('family_id'))
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

        .eq('family_id', localStorage.getItem('family_id'))
        .eq('id', contestId)
        .limit(1)
        .single()

      return data
    } catch (error) {
      console.log('error', error)
    }
  }

  async getCurrentContest(contestId: string): Promise<IFamilyContest[]> {
    try {
      let { error, data } = await supabase
        .from('family_contest')
        .select('*')
        .eq('family_id', localStorage.getItem('family_id'))
        .eq('id', contestId)
        .eq('finished', false)
        .limit(1)
        .single()

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
        .eq('family_id', localStorage.getItem('family_id'))
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
        .eq('family_id', localStorage.getItem('family_id'))
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
}

export default new ContestService()
