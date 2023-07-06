import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { Types } from 'mongoose';

import { JWT_Secret } from '@/config';
import { User } from '@/models';

export const max_age = 3 * 24 * 60 * 60;

export const createToken = (id: string): string => {
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
    return res.status(201).json({ user: response._id });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// const login = () => {};

export default { signup };
