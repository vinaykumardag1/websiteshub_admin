import axios from 'axios'
import { API_URL } from '@/lib/api'
import { useAuthStore } from '@/stores/authStore'

const axiosClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

// -------------------------------
// REQUEST INTERCEPTOR
// -------------------------------
axiosClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// -------------------------------
// RESPONSE INTERCEPTOR (AUTO LOGOUT ON 401)
// -------------------------------
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status

    // If token is invalid, expired, or unauthorized
    if (status === 401) {
      const { logout } = useAuthStore.getState()

      await logout() // ← Clears token + user

      // Redirect to login page
      if (typeof window !== "undefined") {
        window.location.href = "/login"
      }
    }

    return Promise.reject(error)
  }
)

export default axiosClient
