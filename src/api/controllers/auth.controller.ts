import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { Types } from 'mongoose';

import { JWT_Secret } from '@/config';
import Logging from '@/library/logging';
import { User } from '@/models';

const max_age = 3 * 24 * 60 * 60;

const createToken = (id: string): string => {
  const data = sign(
    {
      id,
    },
    JWT_Secret,
    { expiresIn: max_age }
  );
  return data;
};

const signup = async (req: Request, res: Response): Promise<Response> => {
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
    res.cookie('authToken', token, { httpOnly: true, maxAge: max_age });

    return res.status(201).json(response);
  } catch (error) {
    Logging.error(error);
    return res.status(500).json(error);
  }
};

// const login = () => {};

export default { signup };
