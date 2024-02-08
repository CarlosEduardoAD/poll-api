import { z } from "zod"
import { FastifyInstance } from "fastify"
import { createPollBody, getPollParams } from "../../../shared/validations/Poll/PollZodObjects"
import { PollRepositoryPostgres } from "../../../infra/postgres/Poll/pollRepository"
import { CreatePollService, FindPollByIdService } from "../../../infra/postgres/Poll/config/pollRepositoryConfig"
import { FindVotesByPollIdService, ModifyVoteCountService } from "../../../infra/redis/config/VoteRepositoryConfig"
import { ModifyVoteCountInput } from "../../../domain/models/Vote/modifyVoteCountInput"
import { FindVotesByPollId } from "../../../domain/usecases/Vote/FindVotesByPollId"
import { PollInput } from "../../../domain/models/Poll/pollInput"
import { PollOptionInput } from "../../../domain/models/PollOption/pollOptionInput"
import { voting } from "../../../shared/utils/pubSub"

export async function getPoll(app: FastifyInstance) {
  app.get('/polls/:pollId', async (request, reply) => {
    const { pollId } = getPollParams.parse(request.params)
    const poll = await FindPollByIdService.handle(pollId);

    if (!poll) {
      return reply.status(400).send({ message: 'Poll not found.' })
    }

    const result = await FindVotesByPollIdService.handle(pollId);

    const votes = result.reduce((obj : any, line : any, index: number) => {
      if (index % 2 === 0) {
        const score = result[index + 1]

        Object.assign(obj, { [line]: Number(score) })
      }

      return obj
    }, {} as Record<string, number>)

    return reply.send({
      poll: {
        id: poll.id,
        title: poll.title,
        options: poll.options?.map((option) => {
          return {
            id: option.id,
            title: option.title,
            score: (option.id in votes) ? votes[option.id] : 0,
          };
        }),
      },
    });
  })

}

export async function createPoll(app: FastifyInstance) {
  app.post('/polls', async (request, reply) => {
    const { title, options } = createPollBody.parse(request.body)

    const createPollOptionsInput = options.map((option) => new PollOptionInput(option));
    const createPollInput = new PollInput(title, createPollOptionsInput);
    const poll = await CreatePollService.handle(createPollInput);

    return reply.status(201).send({ pollId: poll.id })
  })

}

export async function pollResults(app: FastifyInstance) {
  app.get('/polls/:pollId/results', { websocket: true }, (connection, request) => {
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    })

    const { pollId } = getPollParams.parse(request.params)

    voting.subscribe(pollId, (message) => {
      connection.socket.send(JSON.stringify(message))
    })
  })
}

