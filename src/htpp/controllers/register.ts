import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "../../use-cases/errors/user-already-exists-error";
import { MakeRegisterUseCase } from "../../use-cases/factories/make-register-use-case";

export async function register(req: FastifyRequest, replay: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(req.body);

  try {
    const registerUseCase = MakeRegisterUseCase()

    await registerUseCase.execute({ name, email, password });
  } catch (err) {

    if(err instanceof UserAlreadyExistsError){
      return replay.status(409).send({message: err.message});
    }

    throw err
  }

  return replay.status(201).send();
}
