import { app } from "../../../app";
import { veryfyJwt } from "../../../middleware/verify-jtw";
import { verifyUserRole } from "../../../middleware/verify-user-role";
import { create } from "./create";
import { history } from "./history";
import { metrics } from "./metrics";
import { validate } from "./validate";

export async function checkInsRoutes() {
  // app.addHook("onRequest", veryfyJwt);

  app.post("/gyms/:gymId/check-ins",{ onRequest: [veryfyJwt] }, create);
  
  app.get("/check-ins/history",{ onRequest: [veryfyJwt] }, history);
  app.get("/check-ins/metrics",{ onRequest: [veryfyJwt] }, metrics);

  app.patch('/check-ins/:checkInId/validate',{ onRequest: [veryfyJwt,verifyUserRole("ADMIN")] }, validate)
}
