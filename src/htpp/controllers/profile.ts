import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserProfileUseCase } from "../../use-cases/factories/make-get-user-profile-use.case";

export async function profile(req:FastifyRequest, replay:FastifyReply) {
  
  const {sub:id} = req.user

  const getUserProfileUseCase = makeGetUserProfileUseCase()

  const {user} = await getUserProfileUseCase.execute({userId:id})

  return replay.status(200).send({user})
}