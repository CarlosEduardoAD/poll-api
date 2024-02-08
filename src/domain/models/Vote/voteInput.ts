import { Vote } from "./vote";

export class VoteInput {
    sessionId: string;
    pollId: string;
    pollOptionId: string;

    constructor(sessionId: string, pollId: string, pollOptionId: string) {
      this.sessionId = sessionId;
      this.pollId = pollId;
      this.pollOptionId = pollOptionId;
    }
  }
