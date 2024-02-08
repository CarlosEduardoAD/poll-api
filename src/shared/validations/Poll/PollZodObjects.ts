import { z } from "zod";

export const getPollParams = z.object({
    pollId: z.string().uuid(),
  })

export const createPollBody = z.object({
    title: z.string(),
    options: z.array(z.string()),
})
