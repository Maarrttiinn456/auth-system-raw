import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewear/errorHandler.js';
import connectDB from './db/connectDB.js';

//Routes
import authRouter from './routes/authRoutes.js';
import notesRoute from './routes/notesRoutes.js';

dotenv.config();

const app = express();
const port = 3000;

connectDB();

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

app.use('/auth', authRouter);
app.use('/note', notesRoute);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
