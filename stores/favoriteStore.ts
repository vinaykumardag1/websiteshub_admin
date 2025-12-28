import { create } from "zustand"
import axiosClient from "@/lib/axiosClient"
import { getErrorMessage } from "@/utils/errorMessage"
import type { Favorite } from "@/types/favorites"

interface FavoriteApiResponse {
  data: Favorite[]
  count:number,
}

interface FavoriteStore {
  favorites: Favorite[]
  favcount:number,
  loading: boolean,
  error: string | null
  fetchFavorites: () => Promise<void>
}

export const useFavoriteStore = create<FavoriteStore>((set) => ({
  favorites: [],
  favcount:0,
  loading: false,
  error: null,

  fetchFavorites: async () => {
    set({ loading: true, error: null })

    try {
      const res = await axiosClient.get<FavoriteApiResponse>("/admin/favorites")

      set({
        favorites: res.data.data,
        favcount:res.data.count,
        loading: false,
      })
    } catch (err) {
      set({
        error: getErrorMessage(err),
        loading: false,
      })
    }
  },
}))
