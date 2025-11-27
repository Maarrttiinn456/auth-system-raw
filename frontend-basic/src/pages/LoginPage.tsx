import AuthForm from '../components/auth/AuthForm';
import AuthLayout from '../layouts/AuthLayout';

const LoginPage = () => {
    return (
        <AuthLayout>
            <AuthForm mode="login" />
        </AuthLayout>
    );
};

export default LoginPage;
