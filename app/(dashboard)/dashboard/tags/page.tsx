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
import TagForm from '@/components/dashboard/TagForm'
import { useTagsStore } from '@/stores/Tags'
import { Tag } from '@/types/Tags'

export default function TagsPage() {
  const { tags, loading, error, fetchTags, addTag, updateTag, deleteTag } = useTagsStore()
  const [formOpen, setFormOpen] = useState(false)
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null)

  useEffect(() => {
    fetchTags()
  }, [fetchTags])

  const handleAdd = () => {
    setSelectedTag(null)
    setFormOpen(true)
  }

  const handleEdit = (tag: Tag) => {
    setSelectedTag(tag)
    setFormOpen(true)
  }

  const handleDelete = async (tag: Tag) => {
    if (window.confirm(`Are you sure you want to delete "${tag.tagname}"?`)) {
      await deleteTag(tag._id)
    }
  }

  const handleSubmit = async (data: Omit<Tag, '_id'>) => {
    if (selectedTag) {
      await updateTag(selectedTag._id, data)
    } else {
      await addTag(data)
    }
    setFormOpen(false)
    setSelectedTag(null)
  }

  const columns: Column<Tag>[] = [
    { id: 'tagname', label: 'Tag Name', minWidth: 200 },
    { id: 'description', label: 'Description', minWidth: 300 },
  ]

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
              Tags Management
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Manage your website tags
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            sx={{ minWidth: 140 }}
          >
            Add Tag
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => {}}>
            {error}
          </Alert>
        )}

        <DataTable
          columns={columns}
          rows={tags}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          getRowId={(row) => row._id}
          emptyMessage="No tags found. Click 'Add Tag' to create one."
        />

        <TagForm
          open={formOpen}
          onClose={() => {
            setFormOpen(false)
            setSelectedTag(null)
          }}
          onSubmit={handleSubmit}
          tag={selectedTag}
          loading={loading}
        />
      </Container>
    </DashboardLayout>
  )
}

