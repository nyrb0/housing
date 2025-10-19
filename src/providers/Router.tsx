import PrivateRoute from '@/features/model/PrivateRoute';
import Home from '@/pages/Home';
import ListingsId from '@/pages/ListingsId';
import { LoginPage } from '@/pages/login/LoginPage';
import { Navigate, Route, Routes } from 'react-router-dom';

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginPage />} />
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
    );
};

export default Router;
