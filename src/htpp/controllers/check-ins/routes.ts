import { app } from "../../../app";
import { veryfyJwt } from "../../../middleware/verify-jtw";
import { create } from "./create";
import { history } from "./history";
import { metrics } from "./metrics";
import { validate } from "./validate";

export async function checkInsRoutes() {
  app.addHook("onRequest", veryfyJwt);

  app.post("/gyms/:gymId/check-ins", create);
  
  app.get("/check-ins/history", history);
  app.get("/check-ins/metrics", metrics);

  app.patch('/check-ins/:checkInId/validate', validate)
}