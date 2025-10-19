import { useAuthStore } from '@/store/auth.store';
import toast from 'react-hot-toast';
import { SlLogout } from 'react-icons/sl';

const LogOut = () => {
    const state = useAuthStore();
    return (
        <>
            {!!state.token && (
                <div
                    className='flex items-center gap-1.5 cursor-pointer'
                    onClick={() => {
                        state.logout();
                        toast.success('Успешно вышли с аккаунта!');
                    }}
                >
                    <span className='text-gray-600 dark:text-white'>выйти</span>
                    <SlLogout size={30} className='fill-gray-600 dark:fill-white' />
                </div>
            )}
        </>
    );
};

export default LogOut;
