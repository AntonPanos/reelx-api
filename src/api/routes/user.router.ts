import express from 'express';

import { UserController } from '@/controllers';
import { requireAuth } from '@/middleware/auth';
import { Schemas, ValidateSchema } from '@/middleware/validateSchema';

const router = express.Router();

router.get('/:userId', requireAuth, UserController.getUser);
router.get('/', requireAuth, UserController.getUsers);
router.patch('/:userId', requireAuth, ValidateSchema(Schemas.user.update), UserController.updateUser);
router.delete('/:userId', requireAuth, UserController.deleteUser);

export default router;
