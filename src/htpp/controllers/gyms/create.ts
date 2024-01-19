import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateGymUseCase } from "../../../use-cases/factories/make-create-gym-use-case";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createGymteBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { title, description, phone, latitude, longitude } =
    createGymteBodySchema.parse(req.body);

  const createGymUsecase = makeCreateGymUseCase();

  const {gym} = await createGymUsecase.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  });

  return reply.status(200).send({
    gym,
  })
}
