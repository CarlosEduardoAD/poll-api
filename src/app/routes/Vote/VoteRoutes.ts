import { FastifyInstance } from "fastify";
import { voteOnPollBody, voteOnPollParams } from "../../../shared/validations/Vote/VoteZodObjects";
import { CreateVoteService, DeleteVoteByIdService, FindVoteBySessionIdAndPollIdService } from "../../../infra/postgres/Vote/config/VoteRepositoryConfig";
import { FindVotesByPollIdService, ModifyVoteCountService } from "../../../infra/redis/config/VoteRepositoryConfig";
import { ModifyVoteCountInput } from "../../../domain/models/Vote/modifyVoteCountInput";
import { voting } from "../../../shared/utils/pubSub";
import { randomUUID } from "node:crypto";
import { VoteInput } from "../../../domain/models/Vote/voteInput";
import { FindVotesByPollId } from "../../../domain/usecases/Vote/FindVotesByPollId";

export async function voteOnPoll(app: FastifyInstance) {
    app.post('/polls/:pollId/votes', async (request, reply) => {


      const { pollId } = voteOnPollParams.parse(request.params);
      const { pollOptionId } = voteOnPollBody.parse(request.body);

      let { sessionId } = request.cookies;

      if (sessionId) {
        const userPreviousVoteOnPoll = await FindVoteBySessionIdAndPollIdService.handle(sessionId, pollId);

        if (userPreviousVoteOnPoll && userPreviousVoteOnPoll.pollOptionId !== pollOptionId) {
          await DeleteVoteByIdService.handle(userPreviousVoteOnPoll.id);

          const modifyVoteCountInput = new ModifyVoteCountInput(pollId, -1, userPreviousVoteOnPoll.pollOptionId);
          const votes = await ModifyVoteCountService.handle(modifyVoteCountInput);


          voting.publish(pollId, {
            pollOptionId: userPreviousVoteOnPoll.pollOptionId,
            votes: Number(votes),
          })
        } else if (userPreviousVoteOnPoll) {
          return reply.status(400).send({ message: 'You have already voted on this poll' })
        }
      }

      if (!sessionId) {
        sessionId = randomUUID();
        const days = 60 * 60 * 24 * 30; // 30 days

        reply.setCookie('sessionId', sessionId, {
          path: '/',
          maxAge: days, // 30 days
          signed: true,
          httpOnly: true,
        });
      }

     const voteInput = new VoteInput(sessionId, pollId, pollOptionId);
     await CreateVoteService.handle(voteInput);

      const votes = await FindVotesByPollIdService.handle(pollId);

      voting.publish(pollId, {
        pollOptionId,
        votes: Number(votes),
      })

      return reply.status(201).send();
    });
  }
