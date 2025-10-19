import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface IStateFilter {
    city: string;
    minPrice: number;
    maxPrice: number;
    minRating: number;
    sort: string;
}

interface IFilterStore extends IStateFilter {
    appliedFilters: Partial<IStateFilter>;
    setFilters: (f: keyof IStateFilter, value: number | string) => void;
    applyFilters: () => void;
}

export const useFilterStore = create<IFilterStore>()(
    persist(
        (set, get) => ({
            city: '',
            minPrice: 0,
            minRating: 0,
            maxPrice: 0,
            appliedFilters: {},
            sort: 'price_asc',

            applyFilters: () => {
                const { city, minPrice, maxPrice, minRating, sort } = get();
                set({ appliedFilters: { city, minPrice, maxPrice, minRating, sort } });
            },

            setFilters: (field, value) => set({ [field]: value }),
        }),
        { name: 'filter' }
    )
);
