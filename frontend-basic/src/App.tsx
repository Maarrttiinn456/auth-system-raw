import { Routes, Route } from 'react-router';

//Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

//Guards
import ProtectedRoutes from './guards/ProtectedRoutes';
import AppLayout from './layouts/AppLayout';
import PublicRoutes from './guards/PublicRoutes';
import CreateNotePage from './pages/CreateNotePage';

const App = () => {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route element={<ProtectedRoutes />}>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route
                        path="create-note"
                        element={<CreateNotePage />}
                    ></Route>
                </Route>
                <Route element={<PublicRoutes />}>
                    <Route path="/login" element={<LoginPage />}></Route>
                    <Route path="/register" element={<RegisterPage />}></Route>
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
