import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../repositories/check-ins-repository";
import { GymsRepository } from "../repositories/gyms-repository";
import { getDistanceBetweenCoordinates } from "../utils/get-distance-between-coordinates";
import { ResourceNotFound } from "./errors/resource-not-found";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  private checkInRepository: CheckInsRepository;
  private gymsRepository: GymsRepository;

  constructor(
    checkInRepository: CheckInsRepository,
    gymsRepository: GymsRepository
  ) {
    this.checkInRepository = checkInRepository;
    this.gymsRepository = gymsRepository;
  }

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFound();
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      }
    );

    const MAX_DISTANCE_IN_KILOMETERS = 0.1;

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new Error();
    }

    const checkInOnSameDay = await this.checkInRepository.findBySameDate(
      userId,
      new Date()
    );

    if (checkInOnSameDay) {
      throw new Error();
    }

    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return {
      checkIn,
    };
  }
}
