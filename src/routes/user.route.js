import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getAllUsers, getUserByUsername } from '../controllers/user.controller.js';
import { follow, unfollow } from '../controllers/follow.controller.js';

export const userRouter = express.Router();

userRouter.use(authMiddleware);

userRouter.get('/users', getAllUsers);
userRouter.get('/users/:username', getUserByUsername);

userRouter.post('/users/:username/follow', follow);
userRouter.post('/users/:username/unfollow', unfollow);

export default userRouter;