import ThemeSwitch from '@/shared/ui/theme-switcher/ThemeSwitcher';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='container mx-auto bg-gray-100  shadow-md  dark:bg-[#2f2f2f] rounded-xl p-6 h-[80px] mt-3 '>
            <div className='flex justify-between items-center'>
                <button className='text-2xl font-bold text-gray-600 dark:text-white'>
                    <Link to={'/'}>Главная</Link>
                </button>
                <ThemeSwitch />
            </div>
        </header>
    );
};

export default Header;
