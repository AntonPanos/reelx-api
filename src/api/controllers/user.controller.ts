import { Request, Response } from 'express';

import Logging from '@/library/logging';
import { User } from '@/models';

const getUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (user) return res.status(200).json(user);
    else return res.status(404).json({ message: 'NotFound' });
  } catch (error) {
    Logging.error(error);
    return res.status(500).json(error);
  }
};

const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.find();

    return res.status(200).json(users);
  } catch (error) {
    Logging.error(error);
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
    Logging.error(error);
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
    Logging.error(error);
    return res.status(500).json(error);
  }
};

export default { getUser, getUsers, updateUser, deleteUser };
