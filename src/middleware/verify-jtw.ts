import { FastifyReply, FastifyRequest } from "fastify";

export async function veryfyJwt(req:FastifyRequest, replay:FastifyReply){
  try {
    await req.jwtVerify()
  } catch (err) {
    return replay.status(401).send({message:"Unauthorized"})
  }
}