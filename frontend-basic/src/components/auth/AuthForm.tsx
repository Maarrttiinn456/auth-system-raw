import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import useLoginMutation from '../../queries/auth/useLoginMutation';
import useRegisterMutation from '../../queries/auth/useRegisterMutation';
import type { LoginUser, RegisterUser } from '../../types/auth';
import Toast from '../Toast';
import { createPortal } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

/*Chakra*/
import { Button, Box, Heading } from '@chakra-ui/react';

type AuthFormProps = {
    mode: 'login' | 'register';
};

type LoginForm = {
    email: string;
    password: string;
};
type RegistrationForm = LoginForm & {
    username: string;
};

// --- Shared validators ---
const emailSchema = z
    .string()
    .min(1, 'Email je povinný')
    .email('Email není ve správném formátu');

const passwordSchema = z
    .string()
    .min(10, 'Heslo musí mít alespoň 10 znaků')
    .regex(/[A-Z]/, 'Heslo musí obsahovat alespoň jedno velké písmeno')
    .regex(/[^A-Za-z0-9]/, 'Heslo musí obsahovat alespoň jeden speciální znak');

// --- Login schema ---
const loginValidationSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
});

// --- Registration schema ---
const registrationValidationSchema = z.object({
    username: z.string().min(5, 'Alepoň 5 znaků'),
    email: emailSchema,
    password: passwordSchema,
});

const AuthForm = ({ mode }: AuthFormProps) => {
    const { control, handleSubmit } = useForm<LoginForm | RegistrationForm>({
        resolver: zodResolver(
            mode === 'login'
                ? loginValidationSchema
                : registrationValidationSchema
        ),
        defaultValues:
            mode === 'login'
                ? { email: '', password: '' }
                : { username: '', email: '', password: '' },
    });

    const {
        mutate: loginMutation,
        isPending: isLoginPending,
        isError: isLoginError,
    } = useLoginMutation();
    const {
        mutate: registerMutation,
        isPending: isRegisterPending,
        isError: isRegisterError,
    } = useRegisterMutation();

    const navigate = useNavigate();

    /*
    const handleForm = (e: FormEvent) => {
        e.preventDefault();

        if (mode === 'login') {
            if (!email || !password) {
                return alert('Vyplňte prosím všechna pole');
            }

            if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                setError('Není email');
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
    */

    const onSubmit = (formValues: LoginForm | RegistrationForm) => {
        console.log('formValues:', formValues);
    };

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

            <Box padding={8} backgroundColor="red.700" alignItems="center">
                <Heading textAlign="center">
                    {mode === 'login' ? 'Přihlásit se' : 'Registrovat se'}
                </Heading>
                <form
                    className="flex flex-col items-center gap-4 w-72"
                    //onSubmit={handleForm}
                    onSubmit={handleSubmit(onSubmit, console.error)}
                >
                    {mode === 'register' && (
                        <Controller
                            control={control}
                            name="username"
                            render={({ field, fieldState }) => {
                                return (
                                    <label
                                        htmlFor="username"
                                        className="space-y-2  w-full"
                                    >
                                        <div className="text-sm">Username:</div>
                                        <input
                                            {...field}
                                            id="username"
                                            className="border border-white px-2 py-1 rounded-md w-full"
                                        />
                                        {fieldState.error && (
                                            <p> {fieldState.error.message} </p>
                                        )}
                                    </label>
                                );
                            }}
                        ></Controller>
                    )}

                    <Controller
                        control={control}
                        name="email"
                        render={({ field, fieldState }) => {
                            return (
                                <label
                                    htmlFor="email"
                                    className="space-y-2  w-full"
                                >
                                    <div className="text-sm">Email:</div>
                                    <input
                                        {...field}
                                        type="text"
                                        className="border border-white px-2 py-1 rounded-md w-full"
                                    />
                                    {fieldState.error && (
                                        <p> {fieldState.error.message} </p>
                                    )}
                                </label>
                            );
                        }}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field, fieldState }) => {
                            return (
                                <label
                                    htmlFor="password"
                                    className="space-y-2  w-full"
                                >
                                    <div className="text-sm">Password:</div>
                                    <input
                                        {...field}
                                        type="password"
                                        className="border border-white px-2 py-1 rounded-md w-full"
                                    />
                                    {fieldState.error && (
                                        <p> {fieldState.error.message} </p>
                                    )}
                                </label>
                            );
                        }}
                    />
                    <div className="flex flex-col gap-y-4 justify-between w-full items-center">
                        <Button
                            disabled={isLoginPending || isRegisterPending}
                            type="submit"
                        >
                            {mode === 'login'
                                ? isLoginPending
                                    ? 'Příhlašuji...'
                                    : 'Příhlásit se'
                                : isRegisterPending
                                ? 'Registruji...'
                                : 'Registrovat se'}
                        </Button>
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
            </Box>
        </>
    );
};

export default AuthForm;
