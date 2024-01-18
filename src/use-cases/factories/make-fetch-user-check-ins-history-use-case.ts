import { PrismaCheckInsRepository } from "../../repositories/prisma/prisma-check-ins-repository"
import { fetchUserCheckInsHistoryUseCase } from "../fetch-user-check-ins-history"

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new fetchUserCheckInsHistoryUseCase(checkInsRepository)

  return useCase
}