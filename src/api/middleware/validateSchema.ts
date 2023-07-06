import { NextFunction, Request, Response } from 'express';
import Joi, { ObjectSchema } from 'joi';

import { IPost } from '@/interfaces/post.interface';
import { IUser } from '@/interfaces/user.interface';
import Logging from '@/library/logging';

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      Logging.error(error);
      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  post: {
    create: Joi.object<IPost>({
      title: Joi.string().required().max(30),
      description: Joi.string().required(),
    }),
    update: Joi.object<IPost>({
      title: Joi.string().max(30),
      description: Joi.string(),
    }),
  },
  user: {
    create: Joi.object<IUser>({
      name: Joi.string().required(),
      surname: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
    update: Joi.object<IUser>({
      name: Joi.string(),
      surname: Joi.string(),
    }),
  },
  auth: {
    create: Joi.object<IUser>({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
};
