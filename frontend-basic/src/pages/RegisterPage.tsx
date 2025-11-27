import AuthForm from '../components/auth/AuthForm';
import AuthLayout from '../layouts/AuthLayout';

const RegisterPage = () => {
    return (
        <AuthLayout>
            <AuthForm mode="register" />
        </AuthLayout>
    );
};

export default RegisterPage;
