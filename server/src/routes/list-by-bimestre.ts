import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";
import { Result } from "@prisma/client";
import { z } from "zod";

const createSchema = z.object({
  bimestre: z.string()
})

type schemaType = z.infer<typeof createSchema>

export async function listByBimestre(req:FastifyRequest, res:FastifyReply) {
  try{
    const {bimestre} = createSchema.parse(req.params)
    
    const result = await prisma.result.findMany({
      where:{
        bimestre: bimestre
      },
      select:{
        disciplina: true
      }
    })
    const data = result.map(item=>item.disciplina)
    
  return res.status(200).send({result:data})
  } catch (e) {
    return res.status(400).send({error: e});
  }
}