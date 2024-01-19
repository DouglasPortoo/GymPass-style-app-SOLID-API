import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeFetchUserCheckInsHistoryUseCase } from "../../../use-cases/factories/make-fetch-user-check-ins-history-use-case";

export async function history(req: FastifyRequest, reply: FastifyReply) {
  const user_id = req.user.sub;

  const checkInHistoryQuerySchema = z.object({
    page: z.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(req.query);

  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();

  const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
    page,
    userId: user_id,
  });

  return reply.status(200).send({
    checkIns,
  });
}
