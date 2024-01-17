import { Gym } from "@prisma/client";
import { GymsRepository } from "../repositories/gyms-repository";

interface fetchNearbyGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface fetchNearbyGymsUseCaseResponse {
  gyms: Gym[];
}

export class fetchNearbyGymsUseCase {
  private gymsRepository: GymsRepository;

  constructor(gymsRepository: GymsRepository) {
    this.gymsRepository = gymsRepository;
  }

  async execute({
    userLatitude,
    userLongitude,
  }: fetchNearbyGymsUseCaseRequest): Promise<fetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
