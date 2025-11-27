// Toast.tsx
import { useEffect, useState } from 'react';

type ToastProps = {
    type: 'success' | 'error';
    message: string;
};

const Toast = ({ type, message }: ToastProps) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // první frame: zobrazit (pro animaci z prava)
        const frame = requestAnimationFrame(() => {
            setVisible(true);
        });

        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000);

        return () => {
            cancelAnimationFrame(frame);
            clearTimeout(timer);
        };
    }, []);

    const typestyles =
        type === 'error'
            ? 'text-red-800 bg-red-200 border-red-400'
            : 'text-green-800 bg-green-200 border-green-400';

    const activeStyles = visible
        ? 'translate-x-0 opacity-100'
        : 'translate-x-[200%] opacity-0';

    return (
        <div
            className={`
                absolute top-8 right-0 text-sm px-4 py-2 border
                transform transition-transform duration-300
                ${activeStyles} ${typestyles}
            `}
        >
            {message}
        </div>
    );
};

export default Toast;
