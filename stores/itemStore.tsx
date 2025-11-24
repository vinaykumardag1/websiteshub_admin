import { create } from "zustand"
import axiosClient from "@/lib/axiosClient"
import { getErrorMessage } from "@/utils/errorMessage"
import { Item, ItemPayload } from "@/types/item"

interface ItemStore {
  loading: boolean
  errorMessage: string | null
  items: Item[]

  fetchItems: () => Promise<void>
  postItem: (data: ItemPayload) => Promise<void>
  updateItem: (id: string, data: ItemPayload) => Promise<void>
  deleteItem: (id: string) => Promise<void>
}

export const useItemStore = create<ItemStore>((set, get) => ({
  loading: false,
  errorMessage: null,
  items: [],

  /* ------------------------------------------
     FETCH ITEMS
  ------------------------------------------ */
  fetchItems: async () => {
    set({ loading: true, errorMessage: null })
    try {
      const res = await axiosClient.get("/admin/items")

      set({
        loading: false,
        items: res.data.items || []  // must match backend field
      })
    } catch (error) {
      set({
        loading: false,
        errorMessage: getErrorMessage(error)
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

      set({
        loading: false,
        items: [...get().items, res.data.item] // append returned item
      })
    } catch (error) {
      set({
        loading: false,
        errorMessage: getErrorMessage(error)
      })
    }
  },

  /* ------------------------------------------
     UPDATE ITEM
  ------------------------------------------ */
  updateItem: async (id: string, data: ItemPayload) => {
    set({ loading: true, errorMessage: null })
    try {
      const res = await axiosClient.put(`/admin/update-item/${id}`, data)

      set({
        loading: false,
        items: get().items.map((item) =>
          item._id === id ? res.data.item : item
        )
      })
    } catch (error) {
      set({
        loading: false,
        errorMessage: getErrorMessage(error)
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

      set({
        loading: false,
        items: get().items.filter((item) => item._id !== id)
      })
    } catch (error) {
      set({
        loading: false,
        errorMessage: getErrorMessage(error)
      })
    }
  }
}))
