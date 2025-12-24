/* ----------------------------
   API RESPONSE TYPES
----------------------------- */

export interface ApiResponse<T> {
  message?: string
  data?: T
  error?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ErrorResponse {
  message: string
  error?: string
  statusCode?: number
}

/* ----------------------------
   DASHBOARD API TYPES
----------------------------- */

export interface DashboardStatsResponse {
  totalItems: number
  totalCategories: number
  totalCustomers: number
  totalTags: number
  activeCustomers: number
  blockedCustomers: number
  recentItems: number
  recentCustomers: number
}

/* ----------------------------
   ITEMS API TYPES
----------------------------- */

export interface ItemsResponse {
  items: any[]
  total?: number
}

export interface ItemResponse {
  item: any
  message?: string
}

/* ----------------------------
   CATEGORIES API TYPES
----------------------------- */

export interface CategoriesResponse {
  categoriesData: any[]
  total?: number
}

export interface CategoryResponse {
  category: any
  message?: string
}

/* ----------------------------
   CUSTOMERS API TYPES
----------------------------- */

export interface CustomersResponse {
  customers: any[]
  total?: number
}

export interface CustomerResponse {
  user: any
  message?: string
}

/* ----------------------------
   TAGS API TYPES
----------------------------- */

export interface TagsResponse {
  tags: any[]
  total?: number
}

export interface TagResponse {
  tag: any
  message?: string
}

