import {
  IFamilyContest,
  IContestCreationPayload,
  IContestUpdatePayload,
  IContestEntry,
} from '../types/contest'
import { supabase } from '../utils/supabaseClient'

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
        .select('*')
        .eq('family_id', localStorage.getItem('family_id'))
        .eq('id', contestId)
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
  participate(entry: IContestEntry): void {
    throw new Error('Not Implemented')
  }
  vote(entry_id): void {
    throw new Error('Not Implemented')
  }
}

export default new ContestService()
