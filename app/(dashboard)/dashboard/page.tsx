"use client"

import React, { useEffect } from "react"
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material"
import {
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  People as PeopleIcon,
  LocalOffer as TagIcon,
  TrendingUp as TrendingUpIcon,
  Block as BlockIcon,
} from "@mui/icons-material"

import DashboardLayout from "@/components/dashboard/DashboardLayout"
import StatsCard from "@/components/dashboard/StatsCard"
import { useDashboardStore } from "@/stores/dashboardStore"

export default function DashboardPage() {
  const { stats, loading, error, fetchStats } = useDashboardStore()

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  if (loading && !stats) {
    return (
      <DashboardLayout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <Container maxWidth="lg">
          <Alert severity="error">{error}</Alert>
        </Container>
      </DashboardLayout>
    )
  }

  const summary = stats?.summary

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Box mb={4}>
          <Typography variant="h4" fontWeight={700}>
            Dashboard Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome to your admin dashboard. Here's an overview of your data.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Total Items */}
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Total Items"
              value={summary?.items ?? 0}
              icon={<InventoryIcon />}
              color="#1976d2"
              subtitle="Website items"
            />
          </Grid>

          {/* Total Tags */}
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Tags"
              value={summary?.tags ?? 0}
              icon={<TagIcon />}
              color="#7b1fa2"
              subtitle="Available tags"
            />
          </Grid>

          {/* Total Users */}
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Total Users"
              value={summary?.totalUsers ?? 0}
              icon={<PeopleIcon />}
              color="#f57c00"
              subtitle="Registered users"
            />
          </Grid>

          {/* Blocked Users */}
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Blocked Users"
              value={summary?.blockedUsers ?? 0}
              icon={<BlockIcon />}
              color="#d32f2f"
              subtitle="Blocked accounts"
            />
          </Grid>

          {/* Favorites */}
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Favorites"
              value={summary?.favorites ?? 0}
              icon={<TrendingUpIcon />}
              color="#2e7d32"
              subtitle="Total favorites"
            />
          </Grid>

          {/* Reviews */}
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Reviews"
              value={summary?.reviews ?? 0}
              icon={<CategoryIcon />}
              color="#388e3c"
              subtitle="User reviews"
            />
          </Grid>

          {/* Feedbacks */}
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Feedbacks"
              value={summary?.feedbacks ?? 0}
              icon={<CategoryIcon />}
              color="#0288d1"
              subtitle="User feedbacks"
            />
          </Grid>

          {/* Visited URLs */}
          <Grid item xs={12} sm={6} md={3}>
            <StatsCard
              title="Visited URLs"
              value={summary?.visitedUrls ?? 0}
              icon={<TrendingUpIcon />}
              color="#6a1b9a"
              subtitle="Total visits"
            />
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Box mt={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Quick Actions
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, bgcolor: "#f5f5f5", cursor: "pointer" }}>
                  <Typography fontWeight={600}>Manage Items</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add, edit, or remove website items
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, bgcolor: "#f5f5f5", cursor: "pointer" }}>
                  <Typography fontWeight={600}>Manage Users</Typography>
                  <Typography variant="body2" color="text.secondary">
                    View and manage user accounts
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </DashboardLayout>
  )
}
