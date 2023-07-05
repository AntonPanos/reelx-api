import { Request, Response } from 'express';
import mongoose from 'mongoose';

import { User } from '@/models';

const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, surname, email } = req.body;
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name,
      surname,
      email,
    });

    const response = await user.save();
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (user) return res.status(200).json(user);
    else return res.status(404).json({ message: 'NotFound' });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.find();

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (user) {
      user.set(req.body);
      const response = await user.save();
      return res.status(200).json(response);
    } else return res.status(404).json({ message: 'NotFound' });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);

    if (user) {
      return res.status(201).json(user);
    } else return res.status(404).json({ message: 'NotFound' });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default { createUser, getUser, getUsers, updateUser, deleteUser };
