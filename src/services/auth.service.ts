import { ILoginResponse, IUser } from '@/features/types/auth.types';
import { useAuthStore } from '@/store/auth.store';
import axios from 'axios';

const API_URL = 'http://localhost:4000';

const getToken = () => useAuthStore.getState().token;

export const authService = {
    async login(email: string, password: string): Promise<ILoginResponse> {
        const { data } = await axios.post<ILoginResponse>(`${API_URL}/auth/login`, {
            email,
            password,
        });
        return data;
    },

    async getMe(): Promise<IUser> {
        const token = getToken();
        if (!token) throw new Error('Unauthorized');
        const { data } = await axios.get<IUser>(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data;
    },
};
