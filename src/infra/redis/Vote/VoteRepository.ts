import { Redis } from "ioredis";
import { ModifyVoteCountInput } from "../../../domain/models/Vote/modifyVoteCountInput";

interface IVoteRepository {
    modifyVoteCount(input: ModifyVoteCountInput): Promise<string>;
    findVotesByPollId(pollId: string): Promise<string[]>;
}

export class VoteRepositoryRedis implements IVoteRepository {
    private db;

    constructor(db: Redis) {
        this.db = db;
    }

    async modifyVoteCount(input: ModifyVoteCountInput): Promise<string> {
        return await this.db.zincrby(input.pollId, input.vote, input.pollOptionId);
    }

    async findVotesByPollId(pollId: string): Promise<string[]> {
        return await this.db.zrange(pollId, 0, -1, 'WITHSCORES')
    }
}
