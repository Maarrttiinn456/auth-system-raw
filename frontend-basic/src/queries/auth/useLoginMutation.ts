import { useMutation } from '@tanstack/react-query';
import { loginUserApi } from '../../api/auth';
import type { LoginUser } from '../../types/auth';
import { useAuth } from '../../contexts/authContext';

const useLoginMutation = () => {
    const { setUser, setAccessToken } = useAuth();

    return useMutation({
        mutationFn: (user: LoginUser) => loginUserApi(user),
        onSuccess: (data) => {
            /* Odpověď ze serveru */
            //console.log(data);
            setAccessToken(data.accessToken);
            setUser(data.user);
        },
        onError: (err) => {
            console.log('Přihlášení se nezdařilo', err);
        },
    });
};

export default useLoginMutation;
