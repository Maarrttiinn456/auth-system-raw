import { FiLogOut } from 'react-icons/fi';
import useLogoutMutation from '../queries/auth/useLogoutMutation';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/authContext';

const Headers = () => {
    const { mutate, isError, error } = useLogoutMutation();

    const { accessToken, user } = useAuth();

    const navigate = useNavigate();

    const handleLogout = async () => {
        mutate(undefined, {
            onSuccess: () => {
                navigate('/', { replace: true });
            },
        });
    };

    return (
        <div className="py-2 bg-gray-200">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div className="text-lg text-gray-900 font-semibold">
                        Auth System
                    </div>
                    <div className="flex items-center gap-3">
                        {accessToken && (
                            <>
                                <div className="text-xs text-gray-900">
                                    Vítej zpět, <b>{user?.username}</b>
                                </div>
                                <div className="text-gray-800">|</div>
                                <FiLogOut
                                    className="text-gray-900 cursor-pointer"
                                    onClick={handleLogout}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Headers;
