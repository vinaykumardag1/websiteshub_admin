"use client"
import React, { useEffect, useState } from 'react'
import {
  Container,
  Box,
  Typography,
  Button,
  Alert,
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import DataTable, { Column } from '@/components/dashboard/DataTable'
import CategoryForm from '@/components/dashboard/CategoryForm'
import { useCategoryStore } from '@/stores/categoryStore'
import { Category } from '@/types/category'

export default function CategoriesPage() {
  const { categories, isLoading, error, fetchCategories, addCategory, updateCategory, deleteCategory } = useCategoryStore()
  const [formOpen, setFormOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const handleAdd = () => {
    setSelectedCategory(null)
    setFormOpen(true)
  }

  const handleEdit = (category: Category) => {
    setSelectedCategory(category)
    setFormOpen(true)
  }

  const handleDelete = async (category: Category) => {
    if (window.confirm(`Are you sure you want to delete "${category.categoryname}"?`)) {
      await deleteCategory(category._id!)
    }
  }

  const handleSubmit = async (data: Omit<Category, 'slug' | '_id'>) => {
    if (selectedCategory) {
      await updateCategory(selectedCategory._id!, data)
    } else {
      await addCategory(data)
    }
    setFormOpen(false)
    setSelectedCategory(null)
  }

  const columns: Column<Category>[] = [
    { id: 'categoryname', label: 'Category Name', minWidth: 200 },
    { id: 'description', label: 'Description', minWidth: 300 },
    {
      id: 'image',
      label: 'Image',
      minWidth: 150,
      format: (value) => (
        value ? (
          <img src={value} alt="Category" style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }} />
        ) : 'No image'
      ),
    },
    { id: 'slug', label: 'Slug', minWidth: 150 },
  ]

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
              Categories Management
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Manage your website categories
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            sx={{ minWidth: 140 }}
          >
            Add Category
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => {}}>
            {error}
          </Alert>
        )}

        <DataTable
          columns={columns}
          rows={categories}
          loading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          getRowId={(row) => row._id || ''}
          emptyMessage="No categories found. Click 'Add Category' to create one."
        />

        <CategoryForm
          open={formOpen}
          onClose={() => {
            setFormOpen(false)
            setSelectedCategory(null)
          }}
          onSubmit={handleSubmit}
          category={selectedCategory}
          loading={isLoading}
        />
      </Container>
    </DashboardLayout>
  )
}

