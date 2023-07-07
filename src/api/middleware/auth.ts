import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { JWT_Secret } from '@/config';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.authToken;
  if (token) {
    jwt.verify(token, JWT_Secret, (error: any, decodedToken: any) => {
      if (error) throw Error('Invalid token');
      else {
        console.log('DECODED: ', decodedToken);
        next();
      }
    });
  } else {
    throw Error('No Token');
  }
};
