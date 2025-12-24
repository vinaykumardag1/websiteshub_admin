"use client"
import React, { useEffect, useState } from 'react'
import {
  Container,
  Box,
  Typography,
  Alert,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material'
import { Block as BlockIcon, CheckCircle as UnblockIcon, Delete as DeleteIcon } from '@mui/icons-material'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import DataTable, { Column } from '@/components/dashboard/DataTable'
import { useCustomersStore } from '@/stores/customers'
import { Customer } from '@/types/customers'

export default function CustomersPage() {
  const { customers, loading, error, fetchCustomers, blockCustomer, unblockCustomer, deleteCustomer } = useCustomersStore()
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  const handleBlock = async (customer: Customer) => {
    if (window.confirm(`Are you sure you want to ${customer.isBlocked ? 'unblock' : 'block'} "${customer.firstname} ${customer.lastname}"?`)) {
      setActionLoading(customer._id)
      if (customer.isBlocked) {
        await unblockCustomer(customer._id)
      } else {
        await blockCustomer(customer._id)
      }
      setActionLoading(null)
    }
  }

  const handleDelete = async (customer: Customer) => {
    if (window.confirm(`Are you sure you want to delete "${customer.firstname} ${customer.lastname}"?`)) {
      setActionLoading(customer._id)
      await deleteCustomer(customer._id)
      setActionLoading(null)
    }
  }

  const columns: Column<Customer>[] = [
    { id: 'firstname', label: 'First Name', minWidth: 120 },
    { id: 'lastname', label: 'Last Name', minWidth: 120 },
    { id: 'email', label: 'Email', minWidth: 200 },
    { id: 'mobile', label: 'Mobile', minWidth: 120 },
    {
      id: 'dob',
      label: 'Date of Birth',
      minWidth: 120,
      format: (value) => value ? new Date(value).toLocaleDateString() : 'N/A',
    },
    {
      id: 'isActive',
      label: 'Status',
      minWidth: 100,
      align: 'center',
      format: (value, row) => (
        <Chip
          label={row.isBlocked ? 'Blocked' : value ? 'Active' : 'Inactive'}
          color={row.isBlocked ? 'error' : value ? 'success' : 'default'}
          size="small"
        />
      ),
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
              Customers Management
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Manage your customer accounts
            </Typography>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => {}}>
            {error}
          </Alert>
        )}

        <DataTable
          columns={columns}
          rows={customers}
          loading={loading}
          onDelete={handleDelete}
          getRowId={(row) => row._id}
          emptyMessage="No customers found."
          customActions={(row) => {
            const customer = row as Customer
            return (
              <>
                <Tooltip title={customer.isBlocked ? 'Unblock' : 'Block'}>
                  <IconButton
                    size="small"
                    onClick={() => handleBlock(customer)}
                    color={customer.isBlocked ? 'success' : 'error'}
                    disabled={actionLoading === customer._id}
                  >
                    {customer.isBlocked ? <UnblockIcon fontSize="small" /> : <BlockIcon fontSize="small" />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(customer)}
                    color="error"
                    disabled={actionLoading === customer._id}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </>
            )
          }}
        />
      </Container>
    </DashboardLayout>
  )
}

