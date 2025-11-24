export interface AdminUser {
  id: string
  username: string
  email: string
  roles: string[]
  fullName: string
}

/* ----------------------------
   LOGIN TYPES
----------------------------- */
export interface LoginPayload {
  username: string
  password: string
}

export interface LoginResponse {
  message: string
  token: string
  admin: AdminUser
}

/* ----------------------------
   REGISTER TYPES
----------------------------- */
export interface RegisterPayload {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface RegisterResponse {
  message: string
  admin: AdminUser
}

/* ----------------------------
   ZUSTAND STORE TYPE
----------------------------- */
export interface AuthStore {
  loading: boolean
  accessToken: string | null
  user: AdminUser | null

  successMessage: string | null
  errorMessage: string | null

  login: (payload: LoginPayload) => Promise<LoginResponse>
  register: (payload: RegisterPayload) => Promise<RegisterResponse>
  logout: () => Promise<string>
}
