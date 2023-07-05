import express from 'express';

import { UserController } from '@/controllers';
import { Schemas, ValidateSchema } from '@/middleware/validateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.user.create), UserController.createUser);
router.get('/:userId', UserController.getUser);
router.get('/', UserController.getUsers);
router.patch('/:userId', ValidateSchema(Schemas.user.update), UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);

export default router;
