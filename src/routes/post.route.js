import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js';
import { createPost, deletePost, getAllPosts, getPostById, updatePost } from '../controllers/post.controller.js';

const postRouter = express.Router();

postRouter.use(authMiddleware);

postRouter.get('/posts', getAllPosts);
postRouter.get('/posts/:id', getPostById);
postRouter.post('/posts', createPost);
postRouter.put('/posts/:id', updatePost);
postRouter.delete('/posts/:id', deletePost);

export default postRouter;