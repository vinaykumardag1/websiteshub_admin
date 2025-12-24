"use client"
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material'
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material'

export interface Column<T> {
  id: keyof T | string
  label: string
  minWidth?: number
  align?: 'right' | 'left' | 'center'
  format?: (value: any, row: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  rows: T[]
  loading?: boolean
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
  getRowId: (row: T) => string | number
  emptyMessage?: string
  customActions?: (row: T) => React.ReactNode
}

export default function DataTable<T extends Record<string, any>>({
  columns,
  rows,
  loading = false,
  onEdit,
  onDelete,
  getRowId,
  emptyMessage = 'No data available',
  customActions,
}: DataTableProps<T>) {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    )
  }

  if (rows.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="textSecondary">
          {emptyMessage}
        </Typography>
      </Paper>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="data table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={String(column.id)}
                align={column.align || 'left'}
                style={{ minWidth: column.minWidth, fontWeight: 600 }}
              >
                {column.label}
              </TableCell>
            ))}
            {(onEdit || onDelete || customActions) && (
              <TableCell align="right" style={{ fontWeight: 600 }}>
                Actions
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow hover key={getRowId(row)}>
              {columns.map((column) => {
                const value = column.id.includes('.')
                  ? column.id.split('.').reduce((obj: any, key) => obj?.[key], row)
                  : row[column.id as keyof T]
                
                return (
                  <TableCell key={String(column.id)} align={column.align || 'left'}>
                    {column.format ? column.format(value, row) : String(value ?? '')}
                  </TableCell>
                )
              })}
              {(onEdit || onDelete || customActions) && (
                <TableCell align="right">
                  <Box display="flex" gap={1} justifyContent="flex-end">
                    {customActions ? (
                      customActions(row)
                    ) : (
                      <>
                        {onEdit && (
                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              onClick={() => onEdit(row)}
                              color="primary"
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        {onDelete && (
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              onClick={() => onDelete(row)}
                              color="error"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </>
                    )}
                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

