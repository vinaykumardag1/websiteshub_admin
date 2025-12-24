"use client"
import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Box,
  MenuItem,
  Alert,
} from '@mui/material'
import { Item, ItemPayload } from '@/types/item'
import { useCategoryStore } from '@/stores/categoryStore'
import { useTagsStore } from '@/stores/Tags'

interface ItemFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: ItemPayload) => Promise<void>
  item?: Item | null
  loading?: boolean
}

export default function ItemForm({
  open,
  onClose,
  onSubmit,
  item,
  loading = false,
}: ItemFormProps) {
  const { categories, fetchCategories } = useCategoryStore()
  const { tags, fetchTags } = useTagsStore()
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<ItemPayload>({
    websitename: '',
    websiteUrl: '',
    description: '',
    category: '',
    mobileApp: false,
    image: '',
    ai: false,
    pricingType: '',
    pricingDetails: '',
    tags: '',
    rating: 0,
    features: '',
    country: '',
  })

  useEffect(() => {
    if (open) {
      fetchCategories()
      fetchTags()
    }
  }, [open, fetchCategories, fetchTags])

  useEffect(() => {
    if (item) {
      setFormData({
        websitename: item.websitename,
        websiteUrl: item.websiteUrl,
        description: item.description,
        category: item.category,
        mobileApp: Boolean(item.mobileApp?.appStore || item.mobileApp?.playStore),
        image: item.image,
        ai: item.ai,
        pricingType: item.pricingType,
        pricingDetails: item.pricingDetails,
        tags: item.tags.join(', '),
        rating: item.rating,
        features: item.features.join(', '),
        country: item.country,
      })
    } else {
      setFormData({
        websitename: '',
        websiteUrl: '',
        description: '',
        category: '',
        mobileApp: false,
        image: '',
        ai: false,
        pricingType: '',
        pricingDetails: '',
        tags: '',
        rating: 0,
        features: '',
        country: '',
      })
    }
    setError(null)
  }, [item, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      await onSubmit(formData)
      onClose()
    } catch (err: any) {
      setError(err?.message || 'Failed to save item')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{item ? 'Edit Item' : 'Add New Item'}</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Website Name"
              value={formData.websitename}
              onChange={(e) => setFormData({ ...formData, websitename: e.target.value })}
              required
              fullWidth
            />
            <TextField
              label="Website URL"
              value={formData.websiteUrl}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              required
              fullWidth
              type="url"
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
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              fullWidth
              select
            >
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.categoryname}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
              fullWidth
              type="url"
            />
            <TextField
              label="Tags (comma separated)"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              fullWidth
              placeholder="tag1, tag2, tag3"
            />
            <TextField
              label="Features (comma separated)"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              fullWidth
              placeholder="feature1, feature2, feature3"
            />
            <TextField
              label="Pricing Type"
              value={formData.pricingType}
              onChange={(e) => setFormData({ ...formData, pricingType: e.target.value })}
              fullWidth
              select
            >
              <MenuItem value="free">Free</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="freemium">Freemium</MenuItem>
            </TextField>
            <TextField
              label="Pricing Details"
              value={formData.pricingDetails}
              onChange={(e) => setFormData({ ...formData, pricingDetails: e.target.value })}
              fullWidth
            />
            <TextField
              label="Rating"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
              fullWidth
              type="number"
              inputProps={{ min: 0, max: 5, step: 0.1 }}
            />
            <TextField
              label="Country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              fullWidth
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.ai}
                  onChange={(e) => setFormData({ ...formData, ai: e.target.checked })}
                />
              }
              label="AI Powered"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.mobileApp}
                  onChange={(e) => setFormData({ ...formData, mobileApp: e.target.checked })}
                />
              }
              label="Has Mobile App"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Saving...' : item ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

