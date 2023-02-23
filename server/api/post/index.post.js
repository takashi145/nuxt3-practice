import { PrismaClient } from "@prisma/client";
import Joi from "joi";

const prisma = new PrismaClient();

const Post = Joi.object().keys({
  title: Joi.string().max(30).required(),
  description: Joi.string().required(),
  image: Joi.string(),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { error, value } = Post.validate(body, { abortEarly: false });
  
  if(error) {
    throw createError({
      statusCode: 422,
      data: error.details
    });
  }

  const res = await prisma.post.create({
    data: {
      title: value.title,
      description: value.description,
      image: value.image,
    }
  });

  return res;
})
