import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { getAccessTokenLocal, setAccessTokenLocal } from './authToken';
import { refreshTokenApi } from './auth';

const ApiInstance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
});

//Attach token on refresh
ApiInstance.interceptors.request.use(
    function (config) {
        const token = getAccessTokenLocal();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
);

//refresh token after expire

ApiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('/auth/refresh')
        ) {
            originalRequest._retry = true;
            try {
                const { accessToken: newAccessToken } = await refreshTokenApi();
                setAccessTokenLocal(newAccessToken);
                console.log(
                    'newAccessToken from interceptors:',
                    newAccessToken
                );

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return ApiClient(originalRequest);
            } catch (error) {
                console.log('Refresh token se nevygneroval', error);
            }
        }

        return Promise.reject(error);
    }
);

export const ApiClient = async <T = unknown>(config: AxiosRequestConfig) => {
    return ApiInstance(config).then((res: AxiosResponse<T>) => res.data);
};

export default ApiClient;
