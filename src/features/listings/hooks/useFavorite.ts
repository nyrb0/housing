import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosServiceAuth } from '@/services/http';
import { useFavoritesStore } from '@/store/favorite.store';
import toast from 'react-hot-toast';

export const useToggleFavorite = () => {
    const queryClient = useQueryClient();
    const toggleLocal = useFavoritesStore(state => state.toggleFavoriteLocal);

    return useMutation<{ isFavorite: boolean }, Error, string, { listingId: string }>({
        mutationFn: async listingId => {
            const res = await axiosServiceAuth.post(`/me/favorites/${listingId}/toggle`);
            return res.data;
        },

        onMutate: async listingId => {
            toggleLocal(listingId);
            return { listingId };
        },

        onError: (_, _listingId, context) => {
            if (context?.listingId) toggleLocal(context.listingId); // откат
            toast.error('Ошибка при добавлении в избранное');
        },

        onSuccess: data => {
            toast.success(data.isFavorite ? 'Добавлено в избранное' : 'Удалено из избранного');
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
        },
    });
};
