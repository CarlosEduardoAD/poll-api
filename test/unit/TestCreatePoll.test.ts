import { Poll } from "../../src/domain/models/Poll/poll";
import { PollInput } from "../../src/domain/models/Poll/pollInput";
import { PollOptionInput } from "../../src/domain/models/PollOption/pollOptionInput";
import { ModifyVoteCountInput } from "../../src/domain/models/Vote/modifyVoteCountInput";
import { CreatePollService, FindPollByIdService } from "../../src/infra/postgres/Poll/config/pollRepositoryConfig";
import { FindVotesByPollIdService, ModifyVoteCountService } from "../../src/infra/redis/config/VoteRepositoryConfig";

describe('CreatePoll', () => {
    it('should be able to create a pool and receive the poll id', async () => {
      const options = ["Red", "Blue", "Green"];
      const newPollOptionInput = options.map((option) => new PollOptionInput(option));
      const newPollInput = new PollInput("What is your favorite color?", newPollOptionInput);
      const poll = await CreatePollService.handle(newPollInput);
      const pollId = poll.id;
      expect(pollId).toBeTruthy();
    });
});

