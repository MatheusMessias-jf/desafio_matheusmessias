
import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";


export async function list(req:FastifyRequest, res:FastifyReply) {
  const data = await prisma.result.findMany()
  
  return res.status(201).send({data})
}