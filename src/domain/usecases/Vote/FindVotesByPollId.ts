import { VoteRepositoryRedis } from "../../../infra/redis/Vote/VoteRepository";

interface IFindVotesCount {
    handle(pollId: string): Promise<string[]>;
}

export class FindVotesByPollId implements IFindVotesCount {
    private voteRepository: VoteRepositoryRedis;

    constructor(voteRepository: VoteRepositoryRedis) {
        this.voteRepository = voteRepository;
    }

    async handle(pollId: string): Promise<string[]> {
        return this.voteRepository.findVotesByPollId(pollId);
    }
}
