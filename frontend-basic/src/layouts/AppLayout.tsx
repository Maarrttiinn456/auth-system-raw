import { Outlet } from 'react-router';
import Headers from '../components/Headers';

const AppLayout = () => {
    return (
        <div className="bg-gray-950 text-white min-h-screen overflow-hidden">
            <Headers />
            <div className="container mx-auto pt-8">
                <Outlet />
            </div>
        </div>
    );
};

export default AppLayout;
