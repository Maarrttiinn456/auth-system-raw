import express from 'express';
import {
    loginUser,
    logoutUser,
    refresh,
    registerUser,
} from '../controllers/authControllers.js';

const authRouter = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/logout', logoutUser);
authRouter.post('/refresh', refresh);

export default authRouter;
