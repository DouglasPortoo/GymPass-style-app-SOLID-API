import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeSearchGymsUseCase } from "../../../use-cases/factories/make-search-gyms-use-case";

export async function search(req: FastifyRequest, reply: FastifyReply) {
  const searchGymteBodySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { page, q } = searchGymteBodySchema.parse(req.query);

  const searchGymsUseCase = makeSearchGymsUseCase();

  const { gyms } = await searchGymsUseCase.execute({ page, query: q });

  return reply.status(200).send({ gyms });
}
