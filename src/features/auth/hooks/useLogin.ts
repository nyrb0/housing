import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLogin = () => {
    const setAuth = useAuthStore(s => s.setAuth);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) => authService.login(email, password),
        onSuccess: data => {
            setAuth(data.user, data.token);
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
};
