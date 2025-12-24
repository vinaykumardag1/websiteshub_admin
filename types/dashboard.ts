export interface SummaryStats {
  totalUsers: number
  blockedUsers: number
  favorites: number
  items: number
  tags: number
  feedbacks: number
  reviews: number
  visitedUrls: number
  refreshTokens: number
}

export interface LoginAnalytics {
  totalLogins: number
  averageLoginsPerUser: number
  mostRecentLogin: string
}

export interface ItemAnalytics {
  itemId: string
  websitename: string
  category: string
  description: string
  image: string
  websiteUrl: string
  favoriteCount: number
  totalVisits: number
  uniqueUsersCount: number
  avgRating: number
  totalReviews: number
}

export interface DashboardStats {
  summary: SummaryStats
  userLoginAnalytics: LoginAnalytics
  mostFavoritedItem: ItemAnalytics
  mostVisitedItem: ItemAnalytics
  topRatedItem: ItemAnalytics
}

export interface DashboardStore {
  stats: DashboardStats | null
  loading: boolean
  error: string | null
  fetchStats: () => Promise<void>
}
