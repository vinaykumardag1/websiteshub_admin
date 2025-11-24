export interface Item {
  _id: string
  item_id: number
  websitename: string
  websiteUrl: string
  description: string
  image: string
  category: string
  ai: boolean
  pricingType: string
  pricingDetails: string
  tags: string[]
  rating: number
  features: string[]
  country: string
  adult: boolean
  mobileApp: {
    appStore: string | null
    playStore: string | null
  }
  seo: {
    slug: string
    keywords: string[]
  }
  createdAt: string
  updatedAt: string
}
export interface ItemPayload {
  websitename: string
  websiteUrl: string
  description: string
  category: string
  mobileApp: boolean
  image: string
  ai: boolean
  pricingType: string
  pricingDetails: string
  tags: string        // backend receives single string
  rating: number
  features: string     // backend receives single string
  country: string
}
