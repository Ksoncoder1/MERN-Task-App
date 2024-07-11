import express from 'express';
import dotenv, { config } from 'dotenv';
import { dbConnection } from './database/dbConnection.js';
import userRouter from './router/userRouter.js';
import cookieParser from 'cookie-parser';
import taskRouter from './router/taskRouter.js';
import cors from 'cors';

const app = express();
dotenv.config();

const port = process.env.PORT || 4000;

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

app.use(cookieParser());
app.use(express.json());


app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);

dbConnection();
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})