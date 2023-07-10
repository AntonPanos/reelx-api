import { sign } from 'jsonwebtoken';

import { Access_Token_Secret, Client_URL } from '@/config';
import Logging from '@/library/Logging';

export const signAuthToken = async (id: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    sign({ id }, Access_Token_Secret, { expiresIn: '2h', issuer: Client_URL }, (err, token) => {
      if (err) {
        Logging.error(err);
        reject(err);
        return;
      }
      resolve(token || '');
    });
  });
};
