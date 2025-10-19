import { useAuthStore } from '@/store/auth.store';
import { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const token = useAuthStore(state => state.token);
    const location = useLocation();

    if (!token) return <Navigate to={'/login'} state={{ from: location.pathname }} />;
    return children;
};

export default PrivateRoute;
