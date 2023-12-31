import { Document } from 'mongoose';

export interface IUser {
  name: string;
  surname: string;
  email: string;
}

export interface IUserModel extends IUser, Document {}
