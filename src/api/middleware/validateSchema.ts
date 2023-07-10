import { NextFunction, Request, Response } from 'express';
import Joi, { ObjectSchema } from 'joi';

import { IPost } from '@/interfaces/post.interface';
import { IUser } from '@/interfaces/user.interface';
import Logging from '@/library/Logging';

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
      title: Joi.string().required().max(30).messages({
        'string.base': 'InvalidTitle',
        'string.max': 'InvalidTitleLength',
        'any.required': 'TitleRequired',
      }),
      description: Joi.string().required().messages({
        'string.base': 'InvalidDescription',
        'any.required': 'DescriptionRequired',
      }),
    }),
    update: Joi.object<IPost>({
      title: Joi.string().max(30).messages({
        'string.base': 'InvalidTitle',
        'string.max': 'InvalidTitleLength',
      }),
      description: Joi.string().messages({
        'string.base': 'InvalidDescription',
      }),
    }),
  },
  user: {
    create: Joi.object<IUser>({
      name: Joi.string().required().messages({
        'string.base': 'InvalidName',
        'any.required': 'NameRequired',
      }),
      surname: Joi.string().required().messages({
        'string.base': 'InvalidSurname',
        'any.required': 'SurnameRequired',
      }),
      email: Joi.string().email().lowercase().required().messages({
        'string.base': 'InvalidEmail',
        'string.email': 'InvalidEmail',
        'any.required': 'EmailRequired',
      }),
      password: Joi.string().required().messages({
        'string.base': 'InvalidPassword',
        'any.required': 'PasswordRequired',
      }),
    }),
    update: Joi.object<IUser>({
      name: Joi.string().messages({
        'string.base': 'InvalidName',
      }),
      surname: Joi.string().messages({
        'string.base': 'InvalidSurname',
      }),
    }),
  },
  auth: {
    create: Joi.object<IUser>({
      email: Joi.string().required().messages({
        'string.base': 'InvalidEmail',
        'any.required': 'EmailRequired',
      }),
      password: Joi.string().required().messages({
        'string.base': 'InvalidPassword',
        'any.required': 'PasswordRequired',
      }),
    }),
  },
};
