import { FindPollByIdService } from "../../src/infra/postgres/Poll/config/pollRepositoryConfig";
import { FindVotesByPollIdService } from "../../src/infra/redis/config/VoteRepositoryConfig";

describe('GetPoll', () => {
    it('should be able to get a poll by id and receive the poll with the options and votes', async () => {

      const pollId = "f6325de3-072b-47f4-8207-cff0e313505f";
      const poll = await FindPollByIdService.handle(pollId);

      const result = await FindVotesByPollIdService.handle(pollId);

      const votes = result.reduce((obj : any, line : any, index: number) => {
        if (index % 2 === 0) {
          const score = result[index + 1]

          Object.assign(obj, { [line]: Number(score) })
        }

        return obj
      }, {} as Record<string, number>)

      const pollWithVotes = {
        poll: {
          id: poll?.id,
          title: poll?.title,
          options: poll?.options?.map((option) => {
            return {
              id: option.id,
              title: option.title,
              score: (option.id in votes) ? votes[option.id] : 0,
            };
          }),
        },
      }

      expect(pollWithVotes).toBeTruthy();
    });
})
