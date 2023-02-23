import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  return await prisma.post.delete({
    where: { id: parseInt(id) }
  })
})
