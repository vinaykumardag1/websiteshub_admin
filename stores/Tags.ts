import { create } from "zustand"
import axiosClient from "@/lib/axiosClient"
import { Tag, TagsStore } from "@/types/Tags"  // optional import if you want types in a file
import { getErrorMessage } from "@/utils/errorMessage"

export const useTagsStore = create<TagsStore>((set, get) => ({
  loading: false,
  error: null,
  tags: [],

  // -----------------------------
  // FETCH TAGS
  // -----------------------------
  fetchTags: async () => {
    set({ loading: true, error: null })
    try {
      const res = await axiosClient.get<{ tags: Tag[] }>("/admin/tags")

      set({
        tags: res.data.tags,
        loading: false
      })
    } catch (error) {
      set({
        error: getErrorMessage(error),
        loading: false
      })
    }
  },

  // -----------------------------
  // ADD TAG
  // -----------------------------
  addTag: async (data) => {
    set({ loading: true, error: null })
    try {
      const res = await axiosClient.post<{
        message: string
        tag: Tag
      }>("/admin/add-tag", data)

      set((state) => ({
        tags: [...state.tags, res.data.tag],
        loading: false
      }))
    } catch (error) {
      set({
        error: getErrorMessage(error),
        loading: false
      })
    }
  },

  // -----------------------------
  // UPDATE TAG
  // -----------------------------
  updateTag: async (id, data) => {
    set({ loading: true, error: null })
    try {
      const res = await axiosClient.put<{
        message: string
        tag: Tag
      }>(`/admin/update-tag/${id}`, data)

      set((state) => ({
        tags: state.tags.map((t) =>
          t._id === id ? res.data.tag : t
        ),
        loading: false
      }))
    } catch (error) {
      set({
        error: getErrorMessage(error),
        loading: false
      })
    }
  },

  // -----------------------------
  // DELETE TAG
  // -----------------------------
  deleteTag: async (id) => {
    set({ loading: true, error: null })
    try {
      await axiosClient.delete(`/admin/remove-tag/${id}`)

      set((state) => ({
        tags: state.tags.filter((t) => t._id !== id),
        loading: false
      }))
    } catch (error) {
      set({
        error: getErrorMessage(error),
        loading: false
      })
    }
  }
}))
