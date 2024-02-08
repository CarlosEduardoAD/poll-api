import { v4 } from "uuid";
import { PollOption } from "../PollOption/pollOption";
import { Vote } from "../Vote/vote";

export class Poll {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    options?: PollOption[];
    votes?: Vote[];

    constructor(title: string) {
      this.id = v4();
      this.title = title;
      this.createdAt = new Date();
      this.updatedAt = new Date();
      this.options = [];
      this.votes = [];
    }
  }
