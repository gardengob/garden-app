export interface IFamilyContest {
  id: string
  created_at: string
  winner_id: string
  family_id: string
  type_id: string
  instruction: string
  finished: boolean
  name: string
  recipe_id: string
  ingredient_id: string
  theme_id: string
  entries?: IContestEntry[]
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
  id: string
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
