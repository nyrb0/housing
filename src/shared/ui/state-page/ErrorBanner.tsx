import { Link } from 'react-router-dom';
import Button from '../Button/Button';

interface ErrorBannerProps {
    message: string;
    onRetry?: () => void;
}

export const ErrorBanner = ({ message, onRetry }: ErrorBannerProps) => (
    <div className='flex justify-center items-center h-screen'>
        <div className='flex items-center flex-col gap-3 bg-gray-100 shadow-2xl dark:bg-[#2f2f2f] text-white p-3 rounded max-w-max'>
            <span className='text-red-500'>{message}</span>
            {onRetry && <Button onClick={onRetry}>Повторить</Button>}
            <Link to={'/'} className='text-gray-600 dark:text-white'>
                В главную
            </Link>
        </div>
    </div>
);
