import React from 'react'
import {
  Box,
  Button,
  Container,
  Typography,
} from '@mui/material'
import { formatCurrencyVnd } from '../utils/formatCurrency'
import { CoinPackage, PaymentMethod } from '../types'

interface PayBarProps {
  selectedPackage: CoinPackage | null
  customCoins: number
  currentCoins: number
  currentPrice: number
  selectedPaymentMethod: string | null
  isProcessing: boolean
  onRecharge: () => void
}

export const PayBar: React.FC<PayBarProps> = ({
  selectedPackage,
  customCoins,
  currentCoins,
  currentPrice,
  selectedPaymentMethod,
  isProcessing,
  onRecharge,
}) => {
  const isDisabled = (!selectedPackage && customCoins === 0) || !selectedPaymentMethod || isProcessing

  return (
    <Box
      sx={{
        position: 'sticky',
        bottom: 0,
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        py: 2,
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {(selectedPackage || customCoins > 0) && (
            <Box 
              sx={{ 
                textAlign: 'center',
                p: 3,
                borderRadius: '12px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #e9ecef',
                mb: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {customCoins > 0 ? 'Số coin tùy chỉnh' : 'Gói đã chọn'}
              </Typography>
              {customCoins > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" color="text.primary" sx={{ fontSize: '0.875rem' }}>
                    Bạn đã chọn số coin:
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      // Trigger custom screen again
                      const customButton = document.querySelector('[data-package-id="9"]') as HTMLElement
                      if (customButton) {
                        customButton.click()
                      }
                    }}
                    sx={{
                      fontSize: '0.75rem',
                      color: '#6c757d',
                      borderColor: '#dee2e6',
                      textTransform: 'none',
                      minWidth: 'auto',
                      px: 2,
                      py: 0.5,
                      '&:hover': {
                        backgroundColor: '#f8f9fa',
                        borderColor: '#adb5bd',
                      },
                    }}
                  >
                    Chỉnh sửa
                  </Button>
                </Box>
              )}
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: '600',
                  color: '#212529',
                  mb: 1,
                }}
              >
                {currentCoins.toLocaleString()} Coins
              </Typography>
              <Typography variant="h5" fontWeight="500" color="#6c757d">
                {formatCurrencyVnd(currentPrice)}
              </Typography>
            </Box>
          )}

          <Button
            fullWidth
            variant="contained"
            size="large"
            disabled={isDisabled}
            onClick={onRecharge}
            sx={{
              height: 56,
              fontSize: '1rem',
              fontWeight: '500',
              backgroundColor: '#dc3545',
              borderRadius: '12px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#c82333',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(220, 53, 69, 0.3)',
              },
              '&:disabled': {
                backgroundColor: '#adb5bd',
                transform: 'none',
                boxShadow: 'none',
              },
              transition: 'all 0.2s ease',
            }}
          >
            {isProcessing 
              ? 'Đang xử lý...' 
              : selectedPaymentMethod === 'paypal' 
                ? 'Thanh toán với PayPal' 
                : selectedPaymentMethod === 'visa'
                  ? 'Thanh toán với Visa'
                  : 'Chọn phương thức thanh toán'
            }
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
