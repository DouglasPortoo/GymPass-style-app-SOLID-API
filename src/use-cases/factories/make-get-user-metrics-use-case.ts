import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-check-ins-repository"
import { getUserMetricsUsecase } from "../get-user-metrics"

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new getUserMetricsUsecase(checkInsRepository)

  return useCase
}