import { genSalt, hash } from 'bcrypt';
import mongoose, { Schema } from 'mongoose';

import { IUserModel } from '@/interfaces/user.interface';
import Logging from '@/library/Logging';

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: [true, 'NameRequired'] },
    surname: { type: String, required: [true, 'SurnameRequired'] },
    email: { type: String, required: [true, 'EmailRequired'], lowercase: true, unique: true },
    password: { type: String, required: [true, 'PasswordRequired'], minLength: [8, 'PasswordLength'], select: false },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next): Promise<void> {
  try {
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
    next();
  } catch (error) {
    Logging.error(error);
  }
});

export default mongoose.model<IUserModel>('User', UserSchema);
