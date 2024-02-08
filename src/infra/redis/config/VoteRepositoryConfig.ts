import { FindVotesByPollId } from "../../../domain/usecases/Vote/FindVotesByPollId";
import { ModifyVoteCount } from "../../../domain/usecases/Vote/ModifyVoteCount";
import { redis } from "../../../lib/redis";
import { VoteRepositoryRedis } from "../Vote/VoteRepository";

const repo = new VoteRepositoryRedis(redis);

export const ModifyVoteCountService = new ModifyVoteCount(repo);
export const FindVotesByPollIdService = new FindVotesByPollId(repo);

