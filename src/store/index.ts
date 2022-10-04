import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface  Character {
    id:string
    name:string
  }

  interface FavoritesState {
    favorites: Character[];
    addFavorite: (character: Character) => void;
  }
  


const useStore = create<FavoritesState>(set => ({
  favorites: [],
  addFavorite: (character:Character) =>
    set(state => ({
        favorites: [
        {
          id: character.id,
          name: character.name,
          
        },
        ...state.favorites
      ]
    })),
}));

export const useFavoriteStore = useStore;