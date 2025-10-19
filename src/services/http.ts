import { useAuthStore } from '@/store/auth.store';
import axios from 'axios';

const setting = {
    baseURL: 'http://localhost:4000/api',
    headers: { 'Content-Type': 'application/json' },
};
export const axiosService = axios.create(setting);
export const axiosServiceAuth = axios.create(setting);

axiosServiceAuth.interceptors.request.use(config => {
    const token = useAuthStore.getState().token;

    if (config.headers && token) config.headers.Authorization = `Bearer ${token}`;

    return config;
});
