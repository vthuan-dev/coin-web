import React, { useState } from 'react'
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
} from '@mui/material'
import { gifts } from '../data/packages'
import { Gift } from '../types'

interface GiftPanelProps {
  coinBalance: number
  onSendGift: (gift: Gift) => void
  isProcessing: boolean
}

export const GiftPanel: React.FC<GiftPanelProps> = ({
  coinBalance,
  onSendGift,
  isProcessing,
}) => {
  const [selectedGiftId, setSelectedGiftId] = useState<string | null>(null)

  const selectedGift = gifts.find(g => g.id === selectedGiftId)
  const canAfford = selectedGift ? coinBalance >= selectedGift.priceCoins : false

  return (
    <Container maxWidth="sm" sx={{ px: 2, py: 2 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Chọn quà tặng
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Số dư Coins: {coinBalance.toLocaleString()}
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {gifts.map((gift) => (
            <Grid item xs={6} md={4} key={gift.id}>
              <Card
                sx={{
                  transform: selectedGiftId === gift.id ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.2s ease-in-out',
                  border: selectedGiftId === gift.id ? '2px solid' : '2px solid transparent',
                  borderColor: selectedGiftId === gift.id ? 'primary.main' : 'transparent',
                  opacity: coinBalance < gift.priceCoins ? 0.5 : 1,
                }}
              >
                <CardActionArea
                  onClick={() => setSelectedGiftId(gift.id)}
                  disabled={coinBalance < gift.priceCoins}
                  sx={{ p: 2 }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 0 }}>
                    <Typography variant="h4" sx={{ mb: 1 }}>
                      {gift.emoji}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {gift.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {gift.priceCoins} Coins
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Button
          fullWidth
          variant="contained"
          disabled={!canAfford || isProcessing}
          onClick={() => selectedGift && onSendGift(selectedGift)}
          sx={{
            background: 'linear-gradient(45deg, #ff0050, #ff4081)',
            '&:hover': {
              background: 'linear-gradient(45deg, #e6004a, #e91e63)',
            },
          }}
        >
          {isProcessing ? 'Đang gửi...' : 'Gửi quà'}
        </Button>
      </Box>
    </Container>
  )
}
