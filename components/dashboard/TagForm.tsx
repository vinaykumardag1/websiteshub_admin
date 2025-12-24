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
import { Tag } from '@/types/Tags'

interface TagFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: Omit<Tag, '_id'>) => Promise<void>
  tag?: Tag | null
  loading?: boolean
}

export default function TagForm({
  open,
  onClose,
  onSubmit,
  tag,
  loading = false,
}: TagFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    tagname: '',
    description: '',
  })

  useEffect(() => {
    if (tag) {
      setFormData({
        tagname: tag.tagname,
        description: tag.description,
      })
    } else {
      setFormData({
        tagname: '',
        description: '',
      })
    }
    setError(null)
  }, [tag, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      await onSubmit(formData)
      onClose()
    } catch (err: any) {
      setError(err?.message || 'Failed to save tag')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{tag ? 'Edit Tag' : 'Add New Tag'}</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Tag Name"
              value={formData.tagname}
              onChange={(e) => setFormData({ ...formData, tagname: e.target.value })}
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Saving...' : tag ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

