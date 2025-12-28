'use client'

import Image from 'next/image'
import type { Favorite } from '@/types/favorites'
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Stack,
  Chip,
} from '@mui/material'

interface FavoriteCardProps {
  favorite: Favorite
}

const FavoriteCard = ({ favorite }: FavoriteCardProps) => {
  const { itemId, userId, addedAt } = favorite

  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
        transition: 'all 0.25s ease',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          {/* Website Logo */}
          <Avatar
            variant="rounded"
            sx={{
              width: 56,
              height: 56,
              bgcolor: 'grey.100',
            }}
          >
            {itemId?.image ? (
              <img
                src={itemId.image}
                alt={itemId.websitename}
                width={40}
                height={40}
              />
            ) : (
              itemId?.websitename?.[0]
            )}
          </Avatar>

          {/* Content */}
          <Box flex={1}>
            <Typography variant="h6" fontWeight={600} noWrap>
              {itemId?.websitename}
            </Typography>

            {userId && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                Added by{' '}
                <strong>
                  {userId.firstname} {userId.lastname}
                </strong>{' '}
                • Age {userId.age}
              </Typography>
            )}
            
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Chip
                size="small"
                label={`Added on ${new Date(addedAt).toLocaleDateString()}`}
                variant="outlined"
              />
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default FavoriteCard
