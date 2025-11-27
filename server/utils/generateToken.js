import { SignJWT } from 'jose';
import JWT_SECRET from './getJwtSecret.js';

export const generateToken = async (payload, expireTime) => {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expireTime)
        .sign(JWT_SECRET);
};

export default generateToken;
