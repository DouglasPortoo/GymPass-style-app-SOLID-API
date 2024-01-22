import { FastifyInstance } from "fastify";
import request from "supertest";
import { prisma } from "../../lib/prisma";
import { hash } from "bcryptjs";

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  
) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: await hash('123456', 6),
      role:'ADMIN' 
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@email.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
