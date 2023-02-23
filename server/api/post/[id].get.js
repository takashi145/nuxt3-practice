import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  
  const post = await prisma.post.findFirst({
    where: { id: parseInt(id) },
  });

  if(!post) {
    throw createError({
      statusCode: 404,
      statusMessage: "not found"
    })
  }
  
  return post;
 })