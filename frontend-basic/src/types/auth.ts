export type AuthResponse = {
    accessToken: string;
    user: FrontendUser;
};

export type FrontendUser = {
    id: string;
    username: string;
    email: string;
};

export type LoginUser = {
    email: string;
    password: string;
};

export type RegisterUser = {
    username: string;
    email: string;
    password: string;
};
