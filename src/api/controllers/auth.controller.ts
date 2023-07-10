import { Request, Response } from 'express';
import { compare } from 'bcrypt';
import { Types } from 'mongoose';

import { signAuthToken } from '@/helpers';
import ErrorHandler, { ErrorType } from '@/library/ErrorHandler';
import Logging from '@/library/Logging';
import { User } from '@/models';

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
    const token = await signAuthToken(response._id);
    res.setHeader('Authorization', token);

    return res.status(201).json(response);
  } catch (error) {
    Logging.error(error);
    return res.status(500).json(error);
  }
};

const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select(['password']);
    if (user) {
      const auth = await compare(password, user.password);
      if (auth) {
        const userResponse = await User.findOne({ email });
        const token = await signAuthToken(userResponse?._id);
        res.setHeader('Authorization', token);

        return res.status(200).json(userResponse);
      }
    }
    throw new ErrorHandler('Email or Password are Invalid', ErrorType.CREDENTIALS, 401);
  } catch (error: any) {
    Logging.error(error);
    return res.status(error.statusCode).json({ message: error.message, status: error.statusMessage });
  }
};

const refreshToken = () => {
  console.log('Refresh Token');
};

const logout = () => {
  console.log('Logout');
};

export default { register, login, refreshToken, logout };
