class ContestService {
  getAll(): FamilyContest[] {
    throw new Error('Not Implemented ')
  }
  get(contestId: string): FamilyContest {
    throw new Error('Not Implemented ')
  }
  create(contest: ContestCreationPayload): void {
    throw new Error('Not Implemented ')
  }
  update(contestId: string, data: ContestUpdatePayload): void {
    throw new Error('Not Implemented ')
  }
  participate(entry: ContestEntry): void {
    throw new Error('Not Implemented')
  }
  vote(entry_id): void {
    throw new Error('Not Implemented')
  }
}

export default new ContestService()
