import { FastifyInstance } from "fastify";
import { veryfyJwt } from "../../../middleware/verify-jtw";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { refresh } from "./refresh";

export async function usesrRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);
  app.patch("/token/refresh",refresh)

  app.get("/me", { onRequest: [veryfyJwt] }, profile);
}
