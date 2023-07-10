import express from 'express';

import { PostController } from '@/controllers';
import { verifyAuthToken } from '@/middleware/auth';
import { Schemas, ValidateSchema } from '@/middleware/validateSchema';

const router = express.Router();

router.post('/', verifyAuthToken, ValidateSchema(Schemas.post.create), PostController.createPost);
router.get('/:postId', PostController.getPost);
router.get('/', PostController.getPosts);
router.patch('/:postId', verifyAuthToken, ValidateSchema(Schemas.post.update), PostController.updatePost);
router.delete('/:postId', verifyAuthToken, PostController.deletePost);

export default router;
