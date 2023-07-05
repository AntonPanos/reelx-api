import mongoose, { Schema } from 'mongoose';

import { IPostModel } from '@/interfaces/post.interface';

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPostModel>('Post', PostSchema);
