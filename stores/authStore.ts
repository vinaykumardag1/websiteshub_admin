import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'
import { API_URL } from '@/lib/api'
import {
  AuthStore,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse
} from '@/types/auth'
import { getErrorMessage } from '@/utils/errorMessage'
import axiosClient from '@/lib/axiosClient'

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      loading: false,
      accessToken: null,
      user: null,

      successMessage: null,
      errorMessage: null,

      /* ------------------------------------------
         LOGIN
      ------------------------------------------ */
      login: async (payload: LoginPayload) => {
        const { username, password } = payload;
      
        set({ loading: true, errorMessage: null });
      
        try {
          const res = await axios.post<LoginResponse>(
            `${API_URL}/admin/admin-login`,
            {
              username,
              password,
            }
          );
      
          const { token, admin } = res.data;
      
          set({
            loading: false,
            accessToken: token,
            user: admin,
          });
      
          return res.data;
        } catch (error) {
          set({
            loading: false,
            errorMessage: getErrorMessage(error),
          });
          throw error;
        }
      },
      

      /* ------------------------------------------
         REGISTER
      ------------------------------------------ */
      register: async (payload: RegisterPayload) => {
        set({ loading: true, successMessage: null, errorMessage: null })

        try {
          const res = await axios.post<RegisterResponse>(
            `${API_URL}/admin/admin-register`,
            payload
          )

          set({
            loading: false,
            successMessage: res.data.message
          })

          return res.data
        } catch (error) {
          set({
            loading: false,
            errorMessage: getErrorMessage(error)
          })

          throw error
        }
      },

      /* ------------------------------------------
         LOGOUT
      ------------------------------------------ */
      logout: async () => {
        set({ loading: true, errorMessage: null })

        try {
          const res = await axiosClient.post(`/admin/admin-logout`)

          set({
            loading: false,
            accessToken: null,
            user: null
          })

          return res.data?.message || "Logout successful"
        } catch (error) {
          const msg = getErrorMessage(error)

          set({
            loading: false,
            errorMessage: msg,
            accessToken: null,
            user: null
          })

          return msg
        }
      }
    }),

    /* ------------------------------------------
       PERSIST CONFIG
    ------------------------------------------ */
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user
      })
    }
  )
)
