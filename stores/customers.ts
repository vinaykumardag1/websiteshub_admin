import { create } from "zustand"
import axiosClient from "@/lib/axiosClient"
import { Customer, CustomersStore } from "@/types/customers"
import { getErrorMessage } from "@/utils/errorMessage"

export const useCustomersStore = create<CustomersStore>((set, get) => ({
  loading: false,
  error: null,
  customers: [],

  // ======================================================
  // FETCH CUSTOMERS
  // ======================================================
  fetchCustomers: async () => {
    set({ loading: true, error: null })
    try {
      const res = await axiosClient.get<{ customers: Customer[] }>(
        "/admin/get-customers"
      )

      set({
        customers: res.data.customers,
        loading: false
      })
    } catch (error) {
      set({
        error: getErrorMessage(error),
        loading: false
      })
    }
  },

  // ======================================================
  // BLOCK USER
  // ======================================================
  blockCustomer: async (id: string) => {
    set({ loading: true, error: null })
    try {
      await axiosClient.put(`/admin/block/${id}`)

      set((state) => ({
        customers: state.customers.map((c) =>
          c._id === id ? { ...c, isBlocked: true } : c
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

  // ======================================================
  // UNBLOCK USER
  // ======================================================
  unblockCustomer: async (id: string) => {
    set({ loading: true, error: null })
    try {
      await axiosClient.put(`/admin/unblock/${id}`)

      set((state) => ({
        customers: state.customers.map((c) =>
          c._id === id ? { ...c, isBlocked: false } : c
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

  // ======================================================
  // UPDATE USER
  // ======================================================
  updateCustomer: async (id: string, updatedData: Partial<Customer>) => {
    set({ loading: true, error: null })
    try {
      const res = await axiosClient.put<{ message: string; user: Customer }>(
        `/admin/update-user/${id}`,
        updatedData
      )

      const updatedUser = res.data.user

      set((state) => ({
        customers: state.customers.map((c) =>
          c._id === id ? updatedUser : c
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

  // ======================================================
  // DELETE USER
  // ======================================================
  deleteCustomer: async (id: string) => {
    set({ loading: true, error: null })
    try {
      await axiosClient.delete(`/admin/delete-user/${id}`)

      set((state) => ({
        customers: state.customers.filter((c) => c._id !== id),
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
