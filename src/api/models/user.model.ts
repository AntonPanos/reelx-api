import mongoose, { Schema } from 'mongoose';

import { IUserModel } from '@/interfaces/user.interface';

const UserSchema: Schema = new Schema(
  {
    name: { type: String, require: true },
    surname: { type: String, require: true },
    email: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUserModel>('User', UserSchema);
