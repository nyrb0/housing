import { axiosService } from '@/services/http';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { IListings } from '@/entities/housing-list';

export interface IParamsListings {
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    sort?: string;
    page?: number;
    limit?: number;
}

interface ListingsResponse {
    data: IListings[];
    total: number;
}

export const usePaginatedListings = (params: IParamsListings) => {
    const { city, minPrice = 0, maxPrice = 0, minRating = 0, sort = 'price_asc', page = 1, limit = 20 } = params;

    const queryParams = {
        ...(city ? { city } : {}),
        ...(minPrice ? { minPrice } : {}),
        ...(maxPrice ? { maxPrice } : {}),
        ...(minRating ? { minRating } : {}),
        sort,
        page,
        limit,
    };

    return useQuery<ListingsResponse>({
        queryKey: ['listings', queryParams],
        queryFn: async () => {
            const { data, headers } = await axiosService.get('/listings', { params: queryParams });
            const total = Number(headers['x-total-count']);
            return { data, total };
        },
        placeholderData: keepPreviousData,
    });
};
