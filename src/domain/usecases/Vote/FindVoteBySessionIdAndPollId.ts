import VoteRepositoryPostgres from "../../../infra/postgres/Vote/VoteRepository";
import { Vote } from "../../models/Vote/vote";

interface IFindVoteBySessionIdAndPollId {
    handle(sessionId: string, pollId: string): Promise<Vote | null>;
}

export class FindVoteBySessionIdAndPollId implements IFindVoteBySessionIdAndPollId {
    private voteRepository: VoteRepositoryPostgres;

    constructor(voteRepository: VoteRepositoryPostgres) {
        this.voteRepository = voteRepository;
    }

    async handle(sessionId: string, pollId: string): Promise<Vote | null> {
        return this.voteRepository.findVoteBySessionIdAndPollId(sessionId, pollId);
    }
}
