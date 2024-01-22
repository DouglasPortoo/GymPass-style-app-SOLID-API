import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserProfileUseCase } from "../../../use-cases/factories/make-get-user-profile-use.case";

export async function profile(req: FastifyRequest, reply: FastifyReply) {
  const { sub: id } = req.user;

  const getUserProfileUseCase = makeGetUserProfileUseCase();

  const { user } = await getUserProfileUseCase.execute({ userId: id });

  return reply.status(200).send({ user });
}
