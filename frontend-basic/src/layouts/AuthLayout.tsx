import type { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex items-center justify-center min-h-screen overflow-hidden">
            {children}
        </div>
    );
};

export default AuthLayout;
