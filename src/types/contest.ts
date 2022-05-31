export interface IFamilyContest {
  id: string
  family_id: string
  name: string
  createdAt: string
  type: IContestType
  winner_id: string
}
export interface IContestCreationPayload {
  id: string
  family_id: string
  name: string
  type: string
}
export interface IContestUpdatePayload {
  name: string
  type: string
  winner_id: string
}
export interface IContestEntry {
  id: string
  family_user_id: string
  contest_id: string
  numberOfVote: number
}

export interface IContestType {
  id: string
  label: string
}

export enum EContestState {
  ONGOING = 'ONGOING',
  ARCHIVED = 'ARCHIVED',
}
