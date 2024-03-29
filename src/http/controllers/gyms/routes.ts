import { FastifyInstance } from "fastify";
import { veryfyJwt } from "../../../middleware/verify-jtw";
import { create } from "./create";
import { nearby } from "./nearby";
import { search } from "./search";
import { verifyUserRole } from "../../../middleware/verify-user-role";

export async function gymsRoutes(app: FastifyInstance) {
// app.addHook('onRequest',veryfyJwt)

app.post("/gyms", { onRequest: [veryfyJwt,verifyUserRole("ADMIN")] },create)

app.get("/gyms/nearby",{ onRequest: [veryfyJwt,verifyUserRole("ADMIN")] },nearby)
app.get("/gyms/search",{ onRequest: [veryfyJwt,verifyUserRole("ADMIN")] }, search)
}
