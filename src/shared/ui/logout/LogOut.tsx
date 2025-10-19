import { useAuthStore } from '@/store/auth.store';
import toast from 'react-hot-toast';
import { SlLogout } from 'react-icons/sl';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const LogOut = () => {
    const state = useAuthStore();
    const navigate = useNavigate();
    return (
        <div
            className='flex items-center gap-1.5 cursor-pointer'
            onClick={() => {
                if (state.token) {
                    state.logout();
                    toast.success('Успешно вышли с аккаунта!');
                } else {
                    navigate('/login');
                }
            }}
        >
            <span className='text-gray-600 dark:text-white'>{state.token ? 'выйти' : 'войти'}</span>
            {state.token ? (
                <SlLogout size={30} className='fill-gray-600 dark:fill-white' />
            ) : (
                <FaUser size={30} className='fill-gray-600 dark:fill-white' />
            )}
        </div>
    );
};

export default LogOut;
