import { genSalt, hash } from 'bcrypt';
import mongoose, { Schema } from 'mongoose';

import { IUserModel } from '@/interfaces/user.interface';

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: [true, 'NameRequired'] },
    surname: { type: String, required: [true, 'SurnameRequired'] },
    email: { type: String, required: [true, 'EmailRequired'], lowercase: true, unique: true },
    password: { type: String, required: [true, 'PasswordRequired'], minLength: [8, 'PasswordLength'] },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next): Promise<void> {
  const salt = await genSalt();
  this.password = await hash(this.password, salt);
  next();
});

export default mongoose.model<IUserModel>('User', UserSchema);
