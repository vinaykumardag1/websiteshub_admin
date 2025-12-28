"use client"
import React, { useEffect, useState } from 'react'
import {
  Container,
  Box,
  Typography,
  Button,
  Alert,
  Pagination,
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import DataTable, { Column } from '@/components/dashboard/DataTable'
import ItemForm from '@/components/dashboard/ItemForm'
import { useItemStore } from '@/stores/itemStore'
import { Item } from '@/types/item'

export default function ItemsPage() {
  const {
    items,
    loading,
    errorMessage,
    fetchItems,
    postItem,
    updateItem,
    deleteItem,
    page,
    totalPages,
  } = useItemStore()

  const [formOpen, setFormOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  useEffect(() => {
    fetchItems(1)
  }, [fetchItems])

  const handlePageChange = (_: any, value: number) => {
    fetchItems(value)
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
        <a href={value} target="_blank" rel="noopener noreferrer">
          {value}
        </a>
      ),
    },
    { id: 'category', label: 'Category', minWidth: 120 },
    { id: 'rating', label: 'Rating', minWidth: 100, format: v => `${v}/5` },
  ]

  return (
    <DashboardLayout>
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Typography variant="h4" fontWeight={700}>
            Items Management
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setFormOpen(true)}>
            Add Item
          </Button>
        </Box>

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <DataTable
          columns={columns}
          rows={items}
          loading={loading}
          onEdit={setSelectedItem}
          onDelete={deleteItem}
          getRowId={(row) => row._id}
        />

        {/* PAGINATION */}
        {totalPages > 1 && (
          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        )}

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
