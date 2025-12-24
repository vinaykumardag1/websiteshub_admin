"use client"
import React from 'react'
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material'
import { SxProps, Theme } from '@mui/material/styles'

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color?: string
  subtitle?: string
  sx?: SxProps<Theme>
}

export default function StatsCard({
  title,
  value,
  icon,
  color = '#000',
  subtitle,
  sx,
}: StatsCardProps) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
        ...sx,
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2" fontWeight={500}>
              {title}
            </Typography>
            <Typography variant="h4" component="div" fontWeight={700}>
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Avatar
            sx={{
              bgcolor: color,
              width: 56,
              height: 56,
            }}
          >
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  )
}

