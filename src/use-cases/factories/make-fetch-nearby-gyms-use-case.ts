import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository"
import { fetchNearbyGymsUseCase } from "../fetch-nearby-gyms"

export function makeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new fetchNearbyGymsUseCase(gymsRepository)

  return useCase
}