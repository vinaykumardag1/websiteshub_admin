import { create } from "zustand"
import axiosClient from "@/lib/axiosClient"
import { getErrorMessage } from "@/utils/errorMessage"
import { Item, ItemPayload } from "@/types/item"

interface ItemStore {
  loading: boolean
  errorMessage: string | null
  items: Item[]

  page: number
  totalPages: number
  totalItems: number
  limit: number

  fetchItems: (page?: number) => Promise<void>
  postItem: (data: ItemPayload) => Promise<void>
  updateItem: (id: string, data: ItemPayload) => Promise<void>
  deleteItem: (id: string) => Promise<void>
}

export const useItemStore = create<ItemStore>((set, get) => ({
  loading: false,
  errorMessage: null,
  items: [],

  page: 1,
  totalPages: 1,
  totalItems: 0,
  limit: 10,

  /* ------------------------------------------
     FETCH ITEMS (PAGINATED)
  ------------------------------------------ */
  fetchItems: async (page = 1) => {
    set({ loading: true, errorMessage: null })
    try {
      const { limit } = get()

      const res = await axiosClient.get("/admin/items", {
        params: { page, limit },
      })

      set({
        loading: false,
        items: res.data.items || [],
        page: res.data.page,
        totalPages: res.data.totalPages,
        totalItems: res.data.total,
      })
    } catch (error) {
      set({
        loading: false,
        errorMessage: getErrorMessage(error),
      })
    }
  },

  /* ------------------------------------------
     CREATE ITEM
  ------------------------------------------ */
  postItem: async (data: ItemPayload) => {
    set({ loading: true, errorMessage: null })
    try {
      const res = await axiosClient.post("/admin/add-item", data)

      // refetch current page to keep pagination correct
      await get().fetchItems(get().page)

      set({ loading: false })
    } catch (error) {
      set({
        loading: false,
        errorMessage: getErrorMessage(error),
      })
    }
  },

  /* ------------------------------------------
     UPDATE ITEM
  ------------------------------------------ */
  updateItem: async (id: string, data: ItemPayload) => {
    set({ loading: true, errorMessage: null })
    try {
      await axiosClient.put(`/admin/update-item/${id}`, data)
      await get().fetchItems(get().page)

      set({ loading: false })
    } catch (error) {
      set({
        loading: false,
        errorMessage: getErrorMessage(error),
      })
    }
  },

  /* ------------------------------------------
     DELETE ITEM
  ------------------------------------------ */
  deleteItem: async (id: string) => {
    set({ loading: true, errorMessage: null })
    try {
      await axiosClient.delete(`/admin/delete-item/${id}`)

      // handle page underflow
      const { page, items } = get()
      const newPage = items.length === 1 && page > 1 ? page - 1 : page

      await get().fetchItems(newPage)

      set({ loading: false })
    } catch (error) {
      set({
        loading: false,
        errorMessage: getErrorMessage(error),
      })
    }
  },
}))
