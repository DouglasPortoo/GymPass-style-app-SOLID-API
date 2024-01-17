import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFound } from "./errors/resource-not-found";

let userRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get user profile Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(userRepository);
  });
  it("should be able to get user profile", async () => {
    const createdUser = await userRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: await hash("123456", 6),
    });

    const { user } = await sut.execute({ userId: createdUser.id });

    expect(user.name).toEqual("John Doe");
  });

  it("should not be able to get user profile with wrong id", async () => {
    await expect(
      sut.execute({ userId: "not-exist-id" })
    ).rejects.toBeInstanceOf(ResourceNotFound);
  });
});
