import { Prisma, PrismaClient } from "@prisma/client";
import { Poll } from "../../models/Poll/poll";
import { PollInput } from "../../models/Poll/pollInput";
import { PollRepositoryPostgres } from "../../../infra/postgres/Poll/pollRepository";

interface ICreatePoll {
    handle(poll: PollInput): Promise<Poll>;
}

export class CreatePoll implements ICreatePoll {
    private pollRepository: PollRepositoryPostgres;

    constructor(pollRepository: PollRepositoryPostgres) {
        this.pollRepository = pollRepository;
    }

    async handle(poll: PollInput): Promise<Poll> {
       return this.pollRepository.createPoll(poll);
    }
}

