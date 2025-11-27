import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../contexts/authContext';

const PublicRoutes = () => {
    const { accessToken, isLoading } = useAuth();

    if (isLoading) {
        return <div>Načítám...</div>;
    }

    if (accessToken) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PublicRoutes;
