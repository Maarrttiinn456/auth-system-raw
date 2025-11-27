let accessToken: string | null = null;

export const setAccessTokenLocal = (token: string | null) => {
    accessToken = token;
};

export const getAccessTokenLocal = () => accessToken;
