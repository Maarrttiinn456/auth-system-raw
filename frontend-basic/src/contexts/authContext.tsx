import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';
import { setAccessTokenLocal } from '../api/authToken';
import type { FrontendUser } from '../types/auth';
import { refreshTokenApi } from '../api/auth';

type AuthContextType = {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    user: FrontendUser | null;
    setUser: (user: AuthContextType['user'] | null) => void;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<AuthContextType['user'] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRefereshToken = async () => {
            try {
                const { accessToken: newAccessToken, user } =
                    await refreshTokenApi();
                setAccessToken(newAccessToken);
                setUser(user);
                setAccessTokenLocal(newAccessToken);
            } catch (error) {
                console.log('Nepodařilo se bašíst nový accessToken', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRefereshToken();
    }, []);

    useEffect(() => {
        setAccessTokenLocal(accessToken);
    }, [accessToken]);

    return (
        <AuthContext.Provider
            value={{ accessToken, setAccessToken, user, setUser, isLoading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('Něco se pokazilo');
    }

    return context;
};
