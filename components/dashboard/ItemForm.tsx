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
  const { fetchTags } = useTagsStore()
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState<ItemPayload>({
    websitename: '',
    websiteUrl: '',
    description: '',
    category: '',
    mobileApp: {
      appStore: "",
      playStore: "",
    },
    image: '',
    ai: false,
    pricingType: '',
    pricingDetails: '',
    tags: [],
    rating: 0,
    features: [],
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
        mobileApp: {
          appStore: item.mobileApp?.appStore || "",
          playStore: item.mobileApp?.playStore || "",
        },
        image: item.image,
        ai: item.ai,
        pricingType: item.pricingType,
        pricingDetails: item.pricingDetails,
        tags: item.tags,
        rating: item.rating,
        features: item.features,
        country: item.country,
      })
    } else {
      setFormData({
        websitename: '',
        websiteUrl: '',
        description: '',
        category: '',
        mobileApp: {
          appStore: "",
          playStore: "",
        },
        image: '',
        ai: false,
        pricingType: '',
        pricingDetails: '',
        tags: [],
        rating: 0,
        features: [],
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
          {error && <Alert severity="error">{error}</Alert>}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Website Name"
              value={formData.websitename}
              onChange={(e) => setFormData({ ...formData, websitename: e.target.value })}
              required
            />

            <TextField
              label="Website URL"
              type="url"
              value={formData.websiteUrl}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              required
            />

            <TextField
              label="Description"
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />

            <TextField
              label="Category"
              select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.categoryname}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Image URL"
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />

            <TextField
              label="Tags (comma separated)"
              value={formData.tags.join(', ')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tags: e.target.value.split(',').map(t => t.trim()),
                })
              }
            />

            <TextField
              label="Features (comma separated)"
              value={formData.features.join(', ')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  features: e.target.value.split(',').map(f => f.trim()),
                })
              }
            />

            <TextField
              label="Pricing Type"
              select
              value={formData.pricingType}
              onChange={(e) => setFormData({ ...formData, pricingType: e.target.value })}
            >
              <MenuItem value="free">Free</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="freemium">Freemium</MenuItem>
            </TextField>

            <TextField
              label="Pricing Details"
              value={formData.pricingDetails}
              onChange={(e) => setFormData({ ...formData, pricingDetails: e.target.value })}
            />

            <TextField
              label="Rating"
              type="number"
              inputProps={{ min: 0, max: 5, step: 0.1 }}
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
            />

            <TextField
              label="Country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            />

            <TextField
              label="Android (Play Store URL)"
              value={formData.mobileApp.playStore || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  mobileApp: { ...formData.mobileApp, playStore: e.target.value || null },
                })
              }
            />

            <TextField
              label="iOS (App Store URL)"
              value={formData.mobileApp.appStore || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  mobileApp: { ...formData.mobileApp, appStore: e.target.value || null },
                })
              }
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
