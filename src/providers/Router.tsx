import PrivateRoute from '@/features/model/PrivateRoute';
import Home from '@/pages/Home';
import ListingsId from '@/pages/ListingsId';
import { LoginPage } from '@/pages/login/LoginPage';
import Header from '@/widgets/ui/Header';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import LoginToken from './LoginToken';

const Router = () => {
    const location = useLocation();

    const hideHeader = location.pathname === '/login';

    return (
        <>
            {!hideHeader && <Header />}

            <Routes>
                <Route path='/' element={<Home />} />
                <Route
                    path='/login'
                    element={
                        <LoginToken>
                            <LoginPage />
                        </LoginToken>
                    }
                />
                <Route
                    path='/listings/:id'
                    element={
                        <PrivateRoute>
                            <ListingsId />
                        </PrivateRoute>
                    }
                />
                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
        </>
    );
};

export default Router;
