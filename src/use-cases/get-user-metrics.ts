import { CheckInsRepository } from "../repositories/check-ins-repository";

interface getUserMetricsUsecaseRequest{
userId:string
}

interface getUserMetricsUsecaseResponse{
  checkInsCount: number
  
}

export class getUserMetricsUsecase{
  private checkInsRepository:CheckInsRepository

  constructor(checkInsRepository:CheckInsRepository){
    this.checkInsRepository=checkInsRepository
  }

  async execute({userId}:getUserMetricsUsecaseRequest):Promise<getUserMetricsUsecaseResponse>{
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return{checkInsCount}
  }
}