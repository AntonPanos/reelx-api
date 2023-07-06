import { Router } from 'express';

import { AuthController } from '@/controllers';
import { Schemas, ValidateSchema } from '@/middleware/validateSchema';

const router = Router();

router.post('/', ValidateSchema(Schemas.user.create), AuthController.signup);

export default router;
