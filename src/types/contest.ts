export interface IFamilyContest {
  id: string
  family_id: string
  name: string
  created_at: string
  type: IContestType
  winner_id: string
}
export interface IContestCreationPayload {
  // id: string
  family_id: string
  name: string
  instruction: string
  type_id: string
}
export interface IContestUpdatePayload {
  name: string
  type: string
  winner_id: string
}
export interface IContestEntry {
  family_user_id: string
  family_contest_id: string
  response?: string
  image?: string
  // numberOfVote: number
}

export interface IContestType {
  id: string
  label: string
}

export enum EContestState {
  ONGOING = 'ONGOING',
  ARCHIVED = 'ARCHIVED',
}
