import express from 'express';

import { UserController } from '@/controllers';
import { verifyAuthToken } from '@/middleware/auth';
import { Schemas, ValidateSchema } from '@/middleware/validateSchema';

const router = express.Router();

router.get('/:userId', verifyAuthToken, UserController.getUser);
router.get('/', verifyAuthToken, UserController.getUsers);
router.patch('/:userId', verifyAuthToken, ValidateSchema(Schemas.user.update), UserController.updateUser);
router.delete('/:userId', verifyAuthToken, UserController.deleteUser);

export default router;
