import { PrismaClient } from "@prisma/client";
import { VoteInput } from "../../models/Vote/voteInput";
import VoteRepository from "../../../infra/postgres/Vote/VoteRepository";
import { Vote } from "../../models/Vote/vote";
import VoteRepositoryPostgres from "../../../infra/postgres/Vote/VoteRepository";

interface ICreateVote {
    handle(vote: VoteInput): Promise<Vote>;
}

export class CreateVote implements ICreateVote {
    private voteRepository: VoteRepositoryPostgres;

    constructor(voteRepository: VoteRepositoryPostgres) {
        this.voteRepository = voteRepository;
    }

    async handle(vote: VoteInput): Promise<Vote> {
        return this.voteRepository.createVote(vote);
    }
}
