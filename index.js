import express from 'express';
import userRouter from './src/routes/user.route.js';
import authRouter from './src/routes/auth.route.js'
import postRouter from './src/routes/post.route.js';

const PORT = 3000;

export const app = express();

app.use(express.json());

app.use(authRouter);
app.use(userRouter);
app.use(postRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
