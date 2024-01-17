import { Gym } from "@prisma/client";
import { GymsRepository } from "../repositories/gyms-repository";

interface searchGymsUseCaseRequest{
  query:string
  page:number
}

interface searchGymsUseCaseResponse{
  gyms:Gym[]
}

export class searchGymsUseCase{
  private gymsRepository:GymsRepository

  constructor(gymsRepository:GymsRepository){
    this.gymsRepository=gymsRepository
  }

  async execute({page,query}:searchGymsUseCaseRequest):Promise<searchGymsUseCaseResponse>{
    const gyms = await this.gymsRepository.searchMany(query,page)

    return{gyms}
  }
}