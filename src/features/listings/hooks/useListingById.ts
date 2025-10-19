import { IListings } from '@/entities/housing-list';
import { axiosService } from '@/services/http';
import { useQuery } from '@tanstack/react-query';

export const useListingById = (id: string) => {
    return useQuery({
        queryKey: ['listings', id],
        queryFn: async (): Promise<IListings> => {
            const { data } = await axiosService.get(`/listings/${id}`);
            return data;
        },
        select: data => data,
        enabled: !!id,
    });
};
