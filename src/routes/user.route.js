import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';

export const userRouter = express.Router();

userRouter.use(authMiddleware);

userRouter.get('/users', (req, res) => {
    res.json({
        users: [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Doe' },
        ]
    })
})

export default userRouter;