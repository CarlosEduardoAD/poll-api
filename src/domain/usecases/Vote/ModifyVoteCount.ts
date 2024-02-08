import { VoteRepositoryRedis } from "../../../infra/redis/Vote/VoteRepository";
import { ModifyVoteCountInput } from "../../models/Vote/modifyVoteCountInput";

interface IModifyVoteCount {
    handle(input: ModifyVoteCountInput): Promise<string>;
}

export class ModifyVoteCount implements IModifyVoteCount {
    private voteRepository: VoteRepositoryRedis;

    constructor(voteRepository: any) {
        this.voteRepository = voteRepository;
    }

    async handle(input: ModifyVoteCountInput): Promise<string> {
        return this.voteRepository.modifyVoteCount(input);
    }
}
