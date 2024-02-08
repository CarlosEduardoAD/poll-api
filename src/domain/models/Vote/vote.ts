import { v4 } from "uuid";
import { PollOption } from "../PollOption/pollOption";
import { Poll } from "../Poll/poll";

export class Vote {
    id: string;
    sessionId: string;
    pollId: string;
    pollOptionId: string;
    createdAt: Date;

    constructor(sessionId: string, pollId: string, pollOptionId: string) {
      this.id = v4(); // O valor do id será gerado automaticamente
      this.sessionId = sessionId;
      this.pollId = pollId;
      this.pollOptionId = pollOptionId;
      this.createdAt = new Date();
    }
  }
