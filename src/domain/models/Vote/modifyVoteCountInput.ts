export class ModifyVoteCountInput {
  public pollId: string;
  public vote: number;
  public pollOptionId: string;


  constructor(pollId: string, vote: number, pollOptionId: string) {
    this.pollId = pollId;
    this.vote = vote;
    this.pollOptionId = pollOptionId;
  }
}
