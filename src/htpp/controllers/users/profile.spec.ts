import request from "supertest";
import { app } from "../../../app";
import { describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "../../../utils/test/create-and-authenticate-user";

describe("", () => {
  it("", async () => {
    
    const {token} = await createAndAuthenticateUser(app)

    const profileResponse = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token} `)
      .send();

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: "johndoe@email.com",
      })
    );
  });
});
