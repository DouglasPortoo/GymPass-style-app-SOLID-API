import fastify from "fastify";
import { usesrRoutes } from "./htpp/controllers/users/routes";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import { gymsRoutes } from "./htpp/controllers/gyms/routes";
import { checkInsRoutes } from "./htpp/controllers/check-ins/routes";
import fastifyCookie from "@fastify/cookie";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie:{
    cookieName:'refreshToken',
    signed:false
  },
  sign:{
    expiresIn:"10m"
  }
});

app.register(fastifyCookie)

app.register(usesrRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: "Internal server error." });
});
