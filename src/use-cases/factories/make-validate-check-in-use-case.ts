import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-check-ins-repository"
import { validateCheckInUseCase } from "../validate-check-in"

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new validateCheckInUseCase(checkInsRepository)

  return useCase
}