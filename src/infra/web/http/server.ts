import fastify from "fastify";
import cookie from "@fastify/cookie";
import websocket from "@fastify/websocket";
import { createPoll, getPoll, pollResults } from "../../../app/routes/Poll/PollRoutes";
import { voteOnPoll } from "../../../app/routes/Vote/VoteRoutes";

const app = fastify()

app.register(cookie, {
  secret: process.env.COOKIE_SECRET,
  hook: 'onRequest',
})

app.register(websocket)

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)

app.register(pollResults)

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!")
})
