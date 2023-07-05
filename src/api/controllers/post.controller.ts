import { Request, Response } from 'express';
import mongoose from 'mongoose';

import { Post } from '@/models';

const createPost = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title, description } = req.body;
    const post = new Post({
      _id: new mongoose.Types.ObjectId(),
      title,
      description,
    });

    const response = await post.save();
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getPost = async (req: Request, res: Response): Promise<Response> => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (post) return res.status(200).json(post);
    else return res.status(404).json({ message: 'NotFound' });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getPosts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const posts = await Post.find();

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updatePost = async (req: Request, res: Response): Promise<Response> => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    if (post) {
      post.set(req.body);
      const response = await post.save();
      return res.status(200).json(response);
    } else return res.status(404).json({ message: 'NotFound' });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deletePost = async (req: Request, res: Response): Promise<Response> => {
  try {
    const postId = req.params.postId;
    const post = await Post.findByIdAndDelete(postId);

    if (post) {
      return res.status(201).json(post);
    } else return res.status(404).json({ message: 'NotFound' });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default { createPost, getPost, getPosts, updatePost, deletePost };
