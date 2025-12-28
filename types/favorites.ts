export interface FavoriteItem {
  _id: string
  websitename: string
  image: string
}

export interface User {
  _id: string
  firstname: string
  lastname: string
  email: string
  dob: string
  age: number
}

export interface Favorite {
  _id: string
  userId: User
  itemId: FavoriteItem
  addedAt: string
  __v: number
}
