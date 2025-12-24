import { create } from "zustand"
import axiosClient from "@/lib/axiosClient"
import  { Category, CategoryStore } from "@/types/category" // optional
import { getErrorMessage } from "@/utils/errorMessage"
export const useCategoryStore = create<CategoryStore>((set) => ({
  isLoading: false,
  categories: [],
  error: null,

  // --------------------
  // FETCH CATEGORIES
  // --------------------
  fetchCategories: async () => {
    set({ isLoading: true, error: null })
    try {
      const res = await axiosClient.get<{ categoriesData: Category[] }>(
        "/admin/categories"
      )

      set({
        categories: res.data.categoriesData,
        isLoading: false
      })
    } catch (error) {
      set({
        error: getErrorMessage(error),
        isLoading: false
      })
    }
  },

  // --------------------
  // ADD CATEGORY
  // --------------------
  addCategory: async (data) => {
    set({ isLoading: true, error: null })
    try {
      const res = await axiosClient.post<{
        message: string
        category: Category
      }>("/admin/add-category", data)

      set((state) => ({
        categories: [...state.categories, res.data.category],
        isLoading: false
      }))
    } catch (error) {
      set({
        error: getErrorMessage(error),
        isLoading: false
      })
    }
  },

  // --------------------
  // UPDATE CATEGORY
  // --------------------
  updateCategory: async (id, data) => {
    set({ isLoading: true, error: null })
    try {
      const res = await axiosClient.put<{
        message: string
        category: Category
      }>(`/admin/update-category/${id}`, data)

      set((state) => ({
        categories: state.categories.map((cat) =>
          cat._id === id ? res.data.category : cat
        ),
        isLoading: false
      }))
    } catch (error) {
      set({
        error: getErrorMessage(error),
        isLoading: false
      })
    }
  },

  // --------------------
  // DELETE CATEGORY
  // --------------------
  deleteCategory: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await axiosClient.delete(`/admin/remove-category/${id}`)

      set((state) => ({
        categories: state.categories.filter((cat) => cat._id !== id),
        isLoading: false
      }))
    } catch (error) {
      set({
        error:getErrorMessage(error),
        isLoading: false
      })
    }
  }
}))
