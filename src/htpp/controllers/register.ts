import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { RegisterUseCase } from "../../use-cases/register";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma.users.repository";
import { UserAlreadyExistsError } from "../../use-cases/errors/user-already-exists-error";

export async function register(req: FastifyRequest, replay: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(req.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    await registerUseCase.execute({ name, email, password });
  } catch (err) {

    if(err instanceof UserAlreadyExistsError){
      return replay.status(409).send({message: err.message});
    }

    throw err
  }

  return replay.status(201).send();
}