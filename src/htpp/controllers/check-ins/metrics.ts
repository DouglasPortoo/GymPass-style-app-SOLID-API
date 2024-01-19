import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserMetricsUseCase } from "../../../use-cases/factories/make-get-user-metrics-use-case";

export async function metrics(req:FastifyRequest, reply:FastifyReply){
  const user_id = req.user.sub

  const getUserMetricsUseCase = makeGetUserMetricsUseCase()

  const { checkInsCount} = await getUserMetricsUseCase.execute({
    userId:user_id
  })

  return reply.status(200).send({
    checkInsCount
  })

}