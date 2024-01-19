import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCheckInUseCase } from "../../../use-cases/factories/make-check-in-use.case";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const user_id = req.user.sub;

  const createCheckInParamsSchema = z.object({
    gymId: z.string(),
  });

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { gymId } = createCheckInParamsSchema.parse(req.params);
  const { latitude, longitude } = createCheckInBodySchema.parse(req.body);

  const checkInUseCase = makeCheckInUseCase();

  await checkInUseCase.execute({
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
    userId: user_id,
  });

  return reply.status(200);
}
