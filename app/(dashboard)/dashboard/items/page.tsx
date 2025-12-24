"use client"
import React, { useEffect, useState } from 'react'
import {
  Container,
  Box,
  Typography,
  Button,
  Alert,
  Paper,
  Chip,
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import DataTable, { Column } from '@/components/dashboard/DataTable'
import ItemForm from '@/components/dashboard/ItemForm'
import { useItemStore } from '@/stores/itemStore'
import { Item } from '@/types/item'

export default function ItemsPage() {
  const { items, loading, errorMessage, fetchItems, postItem, updateItem, deleteItem } = useItemStore()
  const [formOpen, setFormOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const handleAdd = () => {
    setSelectedItem(null)
    setFormOpen(true)
  }

  const handleEdit = (item: Item) => {
    setSelectedItem(item)
    setFormOpen(true)
  }

  const handleDelete = async (item: Item) => {
    if (window.confirm(`Are you sure you want to delete "${item.websitename}"?`)) {
      await deleteItem(item._id)
    }
  }

  const handleSubmit = async (data: any) => {
    if (selectedItem) {
      await updateItem(selectedItem._id, data)
    } else {
      await postItem(data)
    }
    setFormOpen(false)
    setSelectedItem(null)
  }

  const columns: Column<Item>[] = [
    { id: 'item_id', label: 'ID', minWidth: 80 },
    { id: 'websitename', label: 'Website Name', minWidth: 200 },
    {
      id: 'websiteUrl',
      label: 'URL',
      minWidth: 200,
      format: (value) => (
        <a href={value} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2' }}>
          {value}
        </a>
      ),
    },
    {
      id: 'category',
      label: 'Category',
      minWidth: 120,
    },
    {
      id: 'rating',
      label: 'Rating',
      minWidth: 100,
      format: (value) => `${value}/5`,
    },
    {
      id: 'ai',
      label: 'AI',
      minWidth: 80,
      align: 'center',
      format: (value) => (
        <Chip
          label={value ? 'Yes' : 'No'}
          color={value ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      id: 'pricingType',
      label: 'Pricing',
      minWidth: 100,
    },
    {
      id: 'createdAt',
      label: 'Created',
      minWidth: 120,
      format: (value) => new Date(value).toLocaleDateString(),
    },
  ]

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
              Items Management
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Manage your website items and listings
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            sx={{ minWidth: 140 }}
          >
            Add Item
          </Button>
        </Box>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => {}}>
            {errorMessage}
          </Alert>
        )}

        <DataTable
          columns={columns}
          rows={items}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          getRowId={(row) => row._id}
          emptyMessage="No items found. Click 'Add Item' to create one."
        />

        <ItemForm
          open={formOpen}
          onClose={() => {
            setFormOpen(false)
            setSelectedItem(null)
          }}
          onSubmit={handleSubmit}
          item={selectedItem}
          loading={loading}
        />
      </Container>
    </DashboardLayout>
  )
}

