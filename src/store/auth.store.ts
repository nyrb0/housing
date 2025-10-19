import { IUser } from '@/features/types/auth.types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    user: IUser | null;
    token: string | null;
    setAuth: (user: IUser, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        set => ({
            user: null,
            token: null,
            setAuth: (user, token) => set({ user, token }),
            logout: () => set({ user: null, token: null }),
        }),
        {
            name: 'auth-storage',
        }
    )
);
