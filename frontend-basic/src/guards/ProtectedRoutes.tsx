import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../contexts/authContext';

const ProtectedRoutes = () => {
    const { accessToken, isLoading } = useAuth();

    if (isLoading) {
        return <div>Načítám</div>;
    }

    if (accessToken) {
        return <Outlet />;
    }

    return <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
