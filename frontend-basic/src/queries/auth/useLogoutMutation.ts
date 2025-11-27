import { useMutation } from '@tanstack/react-query';
import { logoutUserApi } from '../../api/auth';
import { useAuth } from '../../contexts/authContext';

const useLogoutMutation = () => {
    const { setAccessToken, setUser } = useAuth();

    return useMutation({
        mutationFn: logoutUserApi,
        onSuccess: (data) => {
            console.log(data);
            setAccessToken(null);
            setUser(null);
        },
        onError: (err) => {
            console.log('Logout se nezdařil:', err);
        },
    });
};

export default useLogoutMutation;
