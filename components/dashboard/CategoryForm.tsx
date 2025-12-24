"use client"
import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Alert,
} from '@mui/material'
import { Category } from '@/types/category'

interface CategoryFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: Omit<Category, 'slug' | '_id'>) => Promise<void>
  category?: Category | null
  loading?: boolean
}

export default function CategoryForm({
  open,
  onClose,
  onSubmit,
  category,
  loading = false,
}: CategoryFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    categoryname: '',
    description: '',
    image: '',
  })

  useEffect(() => {
    if (category) {
      setFormData({
        categoryname: category.categoryname,
        description: category.description,
        image: category.image,
      })
    } else {
      setFormData({
        categoryname: '',
        description: '',
        image: '',
      })
    }
    setError(null)
  }, [category, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      await onSubmit(formData)
      onClose()
    } catch (err: any) {
      setError(err?.message || 'Failed to save category')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{category ? 'Edit Category' : 'Add New Category'}</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Category Name"
              value={formData.categoryname}
              onChange={(e) => setFormData({ ...formData, categoryname: e.target.value })}
              required
              fullWidth
            />
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
              fullWidth
              type="url"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Saving...' : category ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

