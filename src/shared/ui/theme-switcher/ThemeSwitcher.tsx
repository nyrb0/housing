import { useThemeStore } from '@/store/theme.store';

const ThemeSwitch = () => {
    const { theme, toggleTheme } = useThemeStore();

    if (!theme) {
        console.error('Error: Theme not found');
        return null;
    }

    return (
        <div
            className={'relative flex items-center justify-between w-[50px] h-[23px] p-[2px] text-[18px] select-none bg-white rounded-[30px]'}
            onClick={toggleTheme}
            style={{ background: theme === 'light' ? 'black' : '' }}
        >
            <div>🔆</div>
            <div>🌙</div>
            <div className={'absolute w-[23px] h-[23px] bg-blue-500 rounded-full'} style={theme === 'light' ? { right: '0' } : { left: '0' }}></div>
        </div>
    );
};

export default ThemeSwitch;
