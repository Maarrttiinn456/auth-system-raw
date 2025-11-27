import { useMutation } from '@tanstack/react-query';
import { registerUserApi } from '../../api/auth';
import type { RegisterUser } from '../../types/auth';
import { useAuth } from '../../contexts/authContext';

const useRegisterMutation = () => {
    const { setAccessToken, setUser } = useAuth();

    return useMutation({
        mutationFn: (data: RegisterUser) => registerUserApi(data),
        onSuccess: (data) => {
            setAccessToken(data.accessToken);
            setUser(data.user);
        },
        onError: (err) => {
            console.log('Nepodačilo se registrovat:', err);
        },
    });
};

export default useRegisterMutation;
