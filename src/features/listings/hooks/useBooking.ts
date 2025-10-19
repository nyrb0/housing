import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosServiceAuth } from '@/services/http';
import toast from 'react-hot-toast';
import { IListings } from '@/entities/housing-list';

interface BookingInput {
    listingId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
}

export const useBooking = (listingId?: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: BookingInput) => {
            const res = await axiosServiceAuth.post('/bookings', data);
            return res.data;
        },
        onMutate: () => {
            if (!listingId) return;

            queryClient.setQueryData<IListings>(['listings', listingId], prev => {
                if (!prev) return prev;
                return {
                    ...prev,
                    bookingsCount: (prev.bookingsCount || 0) + 1,
                };
            });
        },

        onError: () => {
            toast.error('Ошибка бронирования (но счётчик не откатывается)');
        },

        onSuccess: () => {
            toast.success('Бронирование успешно!');
        },
    });
};
