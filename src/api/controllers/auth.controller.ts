import { Request, Response } from 'express';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Types } from 'mongoose';

import { JWT_Secret } from '@/config';
import ErrorHandler, { ErrorType } from '@/library/ErrorHandler';
import Logging from '@/library/Logging';
import { User } from '@/models';

const max_age = 3 * 24 * 60 * 60;

const createToken = (id: string): string => {
  const data = sign({ id }, JWT_Secret, { expiresIn: max_age });
  return data;
};

const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, surname, email, password } = req.body;
    const user = new User({
      _id: new Types.ObjectId(),
      name,
      surname,
      email,
      password,
    });

    const response = await user.save();
    const token = createToken(user._id);
    res.cookie('authToken', token, { httpOnly: true, secure: true, maxAge: max_age * 1000 });

    return res.status(201).json(response);
  } catch (error) {
    Logging.error(error);
    return res.status(500).json(error);
  }
};

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('password');
    if (user) {
      const auth = await compare(password, user.password);
      if (auth) {
        const userResponse = await User.findOne({ email });
        const token = createToken(userResponse?._id);
        res.cookie('authToken', token, { httpOnly: true, secure: true, maxAge: max_age * 1000 });

        return res.status(200).json(userResponse);
      }
    }
    throw new ErrorHandler('Email or Password are Invalid', ErrorType.CREDENTIALS, 401);
  } catch (error: any) {
    Logging.error(error);
    return res.status(error.statusCode).json({ message: error.message, status: error.statusMessage });
  }
};

export default { register, login };
