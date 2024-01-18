import { PrismaGymsRepository } from "../../repositories/prisma/prisma-gyms-repository"
import { searchGymsUseCase } from "../search-gyms"

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const useCase = new searchGymsUseCase(gymsRepository)

  return useCase
}