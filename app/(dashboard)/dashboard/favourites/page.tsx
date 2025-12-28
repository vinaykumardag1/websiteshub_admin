'use client'

import React, { useEffect } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { useFavoriteStore } from '@/stores/favoriteStore'
import FavoriteCard from '../../../../components/card/favorites'

const Page = () => {
  const { fetchFavorites, favcount, favorites, loading, error } =
    useFavoriteStore()

  useEffect(() => {
    fetchFavorites()
  }, [fetchFavorites])

  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">My Favorites</h1>

          {/* Favorites Count */}
          <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
            Total: {favcount ?? favorites.length}
          </span>
        </div>

        {/* Loading State */}
        {loading && (
          <p className="text-gray-500">Loading favorites...</p>
        )}

        {/* Error State */}
        {error && (
          <p className="text-red-500">{error}</p>
        )}

        {/* Empty State */}
        {!loading && !error && favorites.length === 0 && (
          <p className="text-gray-500">No favorites found.</p>
        )}

        {/* Favorites Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {favorites.map((item) => (
            <FavoriteCard key={item._id} favorite={item} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Page
