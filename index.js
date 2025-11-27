import express from 'express';
import userRouter from './src/routes/user.route.js';
import authRouter from './src/routes/auth.route.js'

const PORT = 3000;

export const app = express();

app.use(express.json());

app.use(authRouter);
app.use(userRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
