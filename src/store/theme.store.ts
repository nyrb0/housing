import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            theme: typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',

            setTheme: theme => {
                set({ theme });
                if (typeof window !== 'undefined') {
                    document.documentElement.classList.toggle('dark', theme === 'dark');
                }
            },
            toggleTheme: () => {
                set(state => {
                    const newTheme = state.theme === 'light' ? 'dark' : 'light';
                    if (typeof window !== 'undefined') {
                        document.documentElement.classList.toggle('dark', newTheme === 'dark');
                    }
                    return { theme: newTheme };
                });
            },
        }),
        {
            name: 'theme-storage', // ключ в localStorage
            onRehydrateStorage: () => state => {
                // после загрузки store из localStorage — применяем тему к html
                if (state?.theme) {
                    document.documentElement.classList.toggle('dark', state.theme === 'dark');
                }
            },
        }
    )
);
