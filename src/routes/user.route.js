import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getAllUsers, getUserByUsername } from '../controllers/user.controller.js';

export const userRouter = express.Router();

userRouter.use(authMiddleware);

userRouter.get('/users', getAllUsers);
userRouter.get('/users/:username', getUserByUsername);

export default userRouter;