import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { Access_Token_Secret } from '@/config';
import ErrorHandler, { ErrorType } from '@/library/ErrorHandler';
import Logging from '@/library/Logging';

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers['authorization']) throw new ErrorHandler('Unauthorized', ErrorType.UNAUTHORIZED, 401);
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];

    verify(token, Access_Token_Secret, (error, payload) => {
      if (error) throw new ErrorHandler('Unauthorized', ErrorType.UNAUTHORIZED, 401);
      req.body = payload;
      next();
    });
  } catch (error: any) {
    Logging.error(error);
    return res.status(error.statusCode).json({ message: error.message, status: error.statusMessage });
  }
};
