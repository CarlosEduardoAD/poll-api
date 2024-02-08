import { PollRepositoryPostgres } from "../../../infra/postgres/Poll/pollRepository";
import { Poll } from "../../models/Poll/poll";

interface IFindPollById {
    handle(pollId: string): Promise<Poll | null>;
}

export class FindPollById implements IFindPollById {
    private pollRepository: PollRepositoryPostgres;

    constructor(pollRepository: PollRepositoryPostgres) {
        this.pollRepository = pollRepository;
    }

    async handle(pollId: string): Promise<Poll | null> {
        return this.pollRepository.getPollById(pollId);
    }
}
