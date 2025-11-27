import type { AuthResponse, LoginUser } from '../types/auth';
import ApiClient from './client';

export const loginUserApi = async (userData: LoginUser) => {
    return ApiClient<AuthResponse>({
        method: 'POST',
        url: '/auth/login',
        data: userData,
    });
};

export const registerUserApi = async (userData: LoginUser) => {
    return ApiClient<AuthResponse>({
        method: 'POST',
        url: '/auth/register',
        data: userData,
    });
};

export const refreshTokenApi = async () => {
    return ApiClient<AuthResponse>({
        method: 'POST',
        url: '/auth/refresh',
    });
};

export const logoutUserApi = async () => {
    return ApiClient<AuthResponse>({
        method: 'POST',
        url: '/auth/logout',
    });
};
