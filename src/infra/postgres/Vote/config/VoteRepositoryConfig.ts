import { CreateVote } from "../../../../domain/usecases/Vote/CreateVote";
import { DeleteVoteById } from "../../../../domain/usecases/Vote/DeleteVoteById";
import { FindVoteBySessionIdAndPollId } from "../../../../domain/usecases/Vote/FindVoteBySessionIdAndPollId";
import { prisma } from "../../../../lib/prisma";
import VoteRepositoryPostgres from "../VoteRepository";

const repo = new VoteRepositoryPostgres(prisma);

export const CreateVoteService = new CreateVote(repo);
export const DeleteVoteByIdService = new DeleteVoteById(repo);
export const FindVoteBySessionIdAndPollIdService = new FindVoteBySessionIdAndPollId(repo);
