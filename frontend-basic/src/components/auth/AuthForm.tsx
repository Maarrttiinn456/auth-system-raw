import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import useLoginMutation from '../../queries/auth/useLoginMutation';
import useRegisterMutation from '../../queries/auth/useRegisterMutation';
import type { LoginUser, RegisterUser } from '../../types/auth';
import Toast from '../Toast';
import { createPortal } from 'react-dom';

type AuthFormProps = {
    mode: 'login' | 'register';
};

const AuthForm = ({ mode }: AuthFormProps) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {
        mutate: loginMutation,
        isPending: isLoginPending,
        isError: isLoginError,
        error: errorLogin,
    } = useLoginMutation();
    const {
        mutate: registerMutation,
        isPending: isRegisterPending,
        isError: isRegisterError,
    } = useRegisterMutation();

    const navigate = useNavigate();

    const handleForm = (e: FormEvent) => {
        e.preventDefault();

        if (mode === 'login') {
            if (!email || !password) {
                return alert('Vyplňte prosím všechna pole');
            }

            const loginUserData: LoginUser = {
                email,
                password,
            };
            return loginMutation(loginUserData, {
                onSuccess: () => {
                    navigate('/', { replace: true });
                },
            });
        } else {
            if (!email || !password || !username) {
                return alert('Vyplňte prosím všechna pole');
            }

            const regsiterUserData: RegisterUser = {
                username,
                email,
                password,
            };

            return registerMutation(regsiterUserData, {
                onSuccess: () => {
                    navigate('/', { replace: true });
                },
            });
        }
    };

    /**/

    return (
        <>
            {isLoginError &&
                createPortal(
                    <Toast
                        message={'Něco se při přihlášení pokazilo'}
                        type="error"
                    />,
                    document.getElementById('teleport')!
                )}
            {isRegisterError &&
                createPortal(
                    <Toast
                        message={'Něco se při registraci pokazilo'}
                        type="error"
                    />,
                    document.getElementById('teleport')!
                )}

            <div className="bg-gray-900 px-10 py-8 rounded-xl">
                <div className="mb-4 font-bold text-2xl uppercase text-center">
                    {mode === 'login' ? 'Přihlásit se' : 'Registrovat se'}
                </div>
                <form
                    className="flex flex-col items-center gap-4 w-72"
                    onSubmit={handleForm}
                >
                    {mode === 'register' && (
                        <label htmlFor="username" className="space-y-2  w-full">
                            <div className="text-sm">Username:</div>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="border border-white px-2 py-1 rounded-md w-full"
                            />
                        </label>
                    )}

                    <label htmlFor="email" className="space-y-2  w-full">
                        <div className="text-sm">Email:</div>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-white px-2 py-1 rounded-md w-full"
                        />
                    </label>
                    <label htmlFor="password" className="space-y-2  w-full">
                        <div className="text-sm">Heslo:</div>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-white px-2 py-1 rounded-md  w-full"
                        />
                    </label>
                    <div className="flex flex-col gap-y-4 justify-between w-full items-center">
                        <button
                            disabled={isLoginPending || isRegisterPending}
                            type="submit"
                            className="bg-violet-700 px-6 w-fit text-md py-1.5 rounded-full mt-2 cursor-pointer transition hover:bg-violet-800"
                        >
                            {mode === 'login'
                                ? isLoginPending
                                    ? 'Příhlašuji...'
                                    : 'Příhlásit se'
                                : isRegisterPending
                                ? 'Registruji...'
                                : 'Registrovat se'}
                        </button>
                        {mode === 'login' ? (
                            <Link
                                to="/register"
                                className="text-xs underline hover:no-underline"
                            >
                                Nemáš účet? Registrovat se
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="text-xs underline hover:no-underline"
                            >
                                Máš účet? Přihlásit se
                            </Link>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
};

export default AuthForm;
