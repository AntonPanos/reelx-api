import { Router } from 'express';

import { AuthController } from '@/controllers';
import { Schemas, ValidateSchema } from '@/middleware/validateSchema';

const router = Router();

router.post('/register', ValidateSchema(Schemas.user.create), AuthController.register);
router.post('/login', ValidateSchema(Schemas.auth.create), AuthController.login);

export default router;
