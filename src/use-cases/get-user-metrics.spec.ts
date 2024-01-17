import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository";
import { getUserMetricsUsecase } from "./get-user-metrics";

let checInsRepository: InMemoryCheckInsRepository
let sut:getUserMetricsUsecase

describe("Get User Metrics Use Case", ()=>{
  beforeEach(()=>{
    checInsRepository = new InMemoryCheckInsRepository()
    sut = new getUserMetricsUsecase(checInsRepository)
  })

  it("should be able to get check-ins count from metrics",async()=>{
    await checInsRepository.create({
      gym_id:"gym-01",
      user_id:"user-01"
    })

    await checInsRepository.create({
      gym_id:"gym-02",
      user_id:"user-01"
    })

    const {checkInsCount} = await sut.execute({userId:"user-01"})

    expect(checkInsCount).toEqual(2)
  })
})