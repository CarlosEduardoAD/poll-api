import { PrismaClient } from "@prisma/client";
import { Poll } from "../../../domain/models/Poll/poll";
import { PollInput } from "../../../domain/models/Poll/pollInput";
import { prisma } from "../../../lib/prisma";

interface PollRepository {
    createPoll(poll: PollInput): Promise<Poll>;
    getPollById(pollId: string): Promise<Poll | null>;
}

export class PollRepositoryPostgres implements PollRepository {
      private db;

      constructor(db: PrismaClient) {
          this.db = db;
      }


    async createPoll(poll: PollInput): Promise<Poll> {
        const pollTransaction = await prisma.poll.create({
            data: {
              title: poll.title,
              options: {
                createMany: {
                  data: poll.options!.map((option) => {
                    return {
                      title: option.title,
                    }
                  })
                }
              }
            }
          })

        return pollTransaction;

    }

    async getPollById(pollId: string): Promise<Poll | null> {
        const poll = await prisma.poll.findUnique({
            where: {
              id: pollId
            },
            include: {
              options: {
                select: {
                  id: true,
                  title: true,
                }
              }
            }

    })
    return poll;
}}
