import { create } from "zustand"
import { DashboardStore, DashboardStats } from "@/types/dashboard"
import axiosClient from "@/lib/axiosClient"
import { getErrorMessage } from "@/utils/errorMessage"

export const useDashboardStore = create<DashboardStore>((set) => ({
  stats: null,
  loading: false,
  error: null,

  fetchStats: async () => {
    set({ loading: true, error: null })

    try {
      const res = await axiosClient.get("/admin/summary")

      set({
        stats: res.data.data as DashboardStats,
        loading: false,
        error: null,
      })
    } catch (error) {
      set({
        loading: false,
        error: getErrorMessage(error),
      })
    }
  },
}))
