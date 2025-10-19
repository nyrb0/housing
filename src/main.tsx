import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ReactQueryProvider } from './providers/react-query.tsx';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ReactQueryProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ReactQueryProvider>
    </StrictMode>
);
