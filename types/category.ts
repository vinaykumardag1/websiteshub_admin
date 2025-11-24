export interface Category {
  _id?: string
  categoryname: string
  description: string
  image: string
  slug: string
}

export interface CategoryStore {
  isLoading: boolean
  categories: Category[]
  error: string | null

  fetchCategories: () => Promise<void>
  addCategory: (data: Omit<Category, "slug" | "_id">) => Promise<void>
  deleteCategory: (id: string) => Promise<void>
}
