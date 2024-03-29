import { UsersRepository } from "../repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFound } from "./errors/resource-not-found";

interface GetUserProfileUseCaseeRequest {
  userId: string;
}

interface GetUserProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    userId,
  }: GetUserProfileUseCaseeRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFound();
    }

    return { user };
  }
}
