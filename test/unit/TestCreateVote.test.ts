import { ModifyVoteCountInput } from "../../src/domain/models/Vote/modifyVoteCountInput";
import { VoteInput } from "../../src/domain/models/Vote/voteInput";
import { CreateVoteService } from "../../src/infra/postgres/Vote/config/VoteRepositoryConfig";
import { FindVotesByPollIdService, ModifyVoteCountService } from "../../src/infra/redis/config/VoteRepositoryConfig";

describe('VoteOnPoll', () => {
    it('should be able to vote on a poll and receive the updated votes', async () => {
      const pollId = "f6325de3-072b-47f4-8207-cff0e313505f";
      const pollOptionId = "a1807082-59ae-4606-8fcd-98498c8aa2b6";
      const sessionId = "2422a567-b0d5-4db2-a052-7fb19acf392b.HE8N7i7wQgAuhDatgwZTCQXiF0Y6TqauVWsyDnyr4Ek";

      const voteInput = new VoteInput(sessionId, pollId, pollOptionId);
      await CreateVoteService.handle(voteInput);

      const increaseVoteCountInput = new ModifyVoteCountInput(pollId, 1, pollOptionId);
      await ModifyVoteCountService.handle(increaseVoteCountInput);
      const votes = await FindVotesByPollIdService.handle(pollId);
      let votesCount = 0;
      votes.map((vote) => {
        votesCount += Number(vote);
      });
      expect(votesCount).toBeGreaterThan(0);
    });
})
