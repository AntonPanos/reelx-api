import express from 'express';

import { PostController } from '@/controllers';
import { requireAuth } from '@/middleware/auth';
import { Schemas, ValidateSchema } from '@/middleware/validateSchema';

const router = express.Router();

router.post('/', requireAuth, ValidateSchema(Schemas.post.create), PostController.createPost);
router.get('/:postId', PostController.getPost);
router.get('/', PostController.getPosts);
router.patch('/:postId', requireAuth, ValidateSchema(Schemas.post.update), PostController.updatePost);
router.delete('/:postId', requireAuth, PostController.deletePost);

export default router;
