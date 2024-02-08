import VoteRepositoryPostgres from "../../../infra/postgres/Vote/VoteRepository";

interface IDeleteVoteById {
    handle(voteId: string): void;
}

export class DeleteVoteById implements IDeleteVoteById {
    private voteRepository: VoteRepositoryPostgres;

    constructor(voteRepository: VoteRepositoryPostgres) {
        this.voteRepository = voteRepository;
    }

    async handle(voteId: string): Promise<void> {
        return this.voteRepository.deleteVoteById(voteId);
    }
}
