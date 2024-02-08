import { FindPollById } from "../../../../domain/usecases/Poll/FindPollById";
import { PollRepositoryPostgres } from "../pollRepository";
import { prisma } from "../../../../lib/prisma"
import { CreatePoll } from "../../../../domain/usecases/Poll/CreatePoll";

const repo = new PollRepositoryPostgres(prisma);

export const FindPollByIdService = new FindPollById(new PollRepositoryPostgres(prisma));
export const CreatePollService = new CreatePoll(new PollRepositoryPostgres(prisma));
