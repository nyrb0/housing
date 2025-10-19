import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
    favorites: string[];
    setFavorites: (ids: string[]) => void;
    toggleFavoriteLocal: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],
            setFavorites: ids => set({ favorites: ids }),
            toggleFavoriteLocal: id => {
                set({
                    favorites: get().favorites.includes(id) ? get().favorites.filter(f => f !== id) : [...get().favorites, id],
                });
            },
        }),
        { name: 'favorites' } // ключ localStorage
    )
);
