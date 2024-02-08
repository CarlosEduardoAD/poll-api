import { PrismaClient } from "@prisma/client";
import { Vote } from "../../../domain/models/Vote/vote";
import { VoteInput } from "../../../domain/models/Vote/voteInput";
import { prisma } from "../../../lib/prisma";

interface VoteRepository {
    createVote(vote: VoteInput): Promise<Vote>;
    findVoteBySessionIdAndPollId(sessionId: string, pollId: string): Promise<Vote | null>;
    deleteVoteById(voteId: string): void;
}


class VoteRepositoryPostgres implements VoteRepository {
    private db;

    constructor(db: PrismaClient) {
        this.db = db;
    }

    async createVote(vote: VoteInput): Promise<Vote> {
        const voteTransaction = await prisma.vote.create({
            data: {
                sessionId: vote.sessionId,
                pollId: vote.pollId,
                pollOptionId: vote.pollOptionId,
            }
        })

        return voteTransaction;

    }

    async findVoteBySessionIdAndPollId(sessionId: string, pollId: string): Promise<Vote | null> {
       const vote = await prisma.vote.findUnique({
            where: {
              sessionId_pollId: {
                sessionId,
                pollId,
              }
            }
          })
        return vote;
    }

    async deleteVoteById(voteId: string): Promise<void> {
        await prisma.vote.delete({
            where: {
                id: voteId
            }
        })
    }
}

export default VoteRepositoryPostgres;
