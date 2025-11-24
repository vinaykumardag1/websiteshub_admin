export interface LoginHistory {
  _id: string
  device: string
  browser: string
  os: string
  ip: string
  loggedInAt: string
}

export interface Customer {
  _id: string
  firstname: string
  lastname: string
  email: string
  mobile: string
  password: string
  dob: string
  terms_conditions: boolean
  isActive: boolean
  isBlocked: boolean
  preferences: string,
  loginHistory: LoginHistory[]
  createdAt: string
  updatedAt: string
  __v: number

  // also received in your example
  browser?: string
  device?: string
  lastLogin?: string
  os?: string
}

export interface CustomersStore {
  loading: boolean
  error: string | null
  customers: Customer[]

  fetchCustomers: () => Promise<void>
  blockCustomer: (id: string) => Promise<void>
  unblockCustomer: (id: string) => Promise<void>
}
