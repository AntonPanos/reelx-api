import { Document } from 'mongoose';

export interface IPost {
  title: string;
  description: string;
}

export interface IPostModel extends IPost, Document {}
