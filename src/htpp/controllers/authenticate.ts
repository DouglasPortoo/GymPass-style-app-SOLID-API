import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "../../use-cases/errors/invalid-credentials-error";
import { MakeAuthenticateUseCase } from "../../use-cases/factories/make-authenticate-use-case";

export async function authenticate(req: FastifyRequest, replay: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(req.body);

  try {
    const authenticateUseCase = MakeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({ email, password });

    const token = await replay.jwtSign({}, { sign: { sub: user.id } });

    return replay.status(200).send({ token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return replay.status(400).send({ message: err.message });
    }

    throw err;
  }
}
