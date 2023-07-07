import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { JWT_Secret } from '@/config';
import ErrorHandler, { ErrorType } from '@/library/ErrorHandler';
import Logging from '@/library/Logging';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.authToken;
    if (token) {
      jwt.verify(token, JWT_Secret, (error: any) => {
        if (error) throw new ErrorHandler('Token is invalid', ErrorType.UNAUTHORIZED, 401);
        else {
          next();
        }
      });
    } else {
      throw new ErrorHandler('User in Unauthorized', ErrorType.UNAUTHORIZED, 401);
    }
  } catch (error: any) {
    Logging.error(error);
    return res.status(error.statusCode).json({ message: error.message, status: error.statusMessage });
  }
};
