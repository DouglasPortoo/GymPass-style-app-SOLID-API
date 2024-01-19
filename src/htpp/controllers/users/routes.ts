import { FastifyInstance } from "fastify";

import { veryfyJwt } from "../../../middleware/verify-jtw";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";

export async function usesrRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  app.get("/me", { onRequest: [veryfyJwt] }, profile);
}
