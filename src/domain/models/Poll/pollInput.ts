import { PollOption } from "../PollOption/pollOption";
import { PollOptionInput } from "../PollOption/pollOptionInput";
import { Poll } from "./poll";

export class PollInput {
    title: string;
    options?: PollOptionInput[];

    constructor(title: string, options?: PollOptionInput[]) {
      this.title = title;
      this.options =  options;
    }
  }
