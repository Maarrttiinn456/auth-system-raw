import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './contexts/authContext.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from './components/ui/provider';
import './index.css';
import App from './App.tsx';

import queryClient from './queryClient.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </QueryClientProvider>
            </AuthProvider>
        </Provider>
    </StrictMode>
);
