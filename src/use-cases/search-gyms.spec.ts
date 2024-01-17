import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { searchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: searchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new searchGymsUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Panobianco",
      description: "Minha academia",
      latitude: 0,
      longitude: 0,
    });

    await gymsRepository.create({
      title: "Smart Fit",
      description: "Minha ANTIGA academia",
      latitude: 3,
      longitude: 3,
    });

    const {gyms} = await sut.execute({page:1,query:"Panobianco"})

    expect(gyms).toEqual([expect.objectContaining({title:"Panobianco"})])
    expect(gyms).toHaveLength(1)
  });

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
});
