import { v4 } from "uuid";
import { Poll } from "../Poll/poll";
import { Vote } from "../Vote/vote";

export class PollOption {
    id: string;
    title: string;


    constructor(title: string) {
      this.id = v4();
      this.title = title;
    }
  }
