import { useAuthStore } from '@/store/auth.store';
import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

const LoginToken = ({ children }: { children: JSX.Element }) => {
    const token = useAuthStore(state => state.token);

    if (token) return <Navigate to={'/'} />;
    return children;
};

export default LoginToken;
