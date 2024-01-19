import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../repositories/check-ins-repository";
import { ResourceNotFound } from "./errors/resource-not-found";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error";

interface validateCheckInUseCaseRequest {
  checkInId: string;
}

interface validateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class validateCheckInUseCase {

  private checkInsRepository: CheckInsRepository;

  constructor(checkInsRepository: CheckInsRepository) {
    this.checkInsRepository = checkInsRepository;
  }

  async execute({
    checkInId,
  }: validateCheckInUseCaseRequest): Promise<validateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFound();
    }

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes"
    );

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.save(checkIn);

    return { checkIn };
  }
}
