import express from 'express';

import { PostController } from '@/controllers';
import { Schemas, ValidateSchema } from '@/middleware/validateSchema';

const router = express.Router();

router.post('/', ValidateSchema(Schemas.post.create), PostController.createPost);
router.get('/:postId', PostController.getPost);
router.get('/', PostController.getPosts);
router.patch('/:postId', ValidateSchema(Schemas.post.update), PostController.updatePost);
router.delete('/:postId', PostController.deletePost);

export default router;
