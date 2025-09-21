import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Card,
  CardContent,
  Chip,
} from '@mui/material'
import { CheckCircle, Receipt, Payment } from '@mui/icons-material'
import { formatCurrencyVnd } from '../utils/formatCurrency'

interface PaymentSuccessDialogProps {
  open: boolean
  onClose: () => void
  orderDetails: {
    coins: number
    priceVnd: number
    paymentMethod: string
    recipient?: string
    orderId: string
    timestamp: string
  } | null
}

export const PaymentSuccessDialog: React.FC<PaymentSuccessDialogProps> = ({
  open,
  onClose,
  orderDetails,
}) => {
  // Kiểm tra null và cung cấp giá trị mặc định
  if (!orderDetails) {
    return null
  }

  const { coins, priceVnd, paymentMethod, recipient, orderId, timestamp } = orderDetails

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CheckCircle 
            sx={{ 
              fontSize: 64, 
              color: '#4caf50',
              filter: 'drop-shadow(0 4px 8px rgba(76, 175, 80, 0.3))',
            }} 
          />
          <Typography 
            variant="h4" 
            fontWeight="bold"
            sx={{
              background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Thanh toán thành công!
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 2 }}>
        <Card
          sx={{
            border: '2px solid #e8f5e8',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.05), rgba(139, 195, 74, 0.05))',
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Receipt sx={{ color: '#4caf50' }} />
              <Typography variant="h6" fontWeight="bold" color="#4caf50">
                Chi tiết đơn hàng
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Mã đơn hàng:
                </Typography>
                <Typography variant="body2" fontWeight="bold" fontFamily="monospace">
                  #{orderId}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Thời gian:
                </Typography>
                <Typography variant="body2" fontWeight="bold">
                  {new Date(timestamp).toLocaleString('vi-VN')}
                </Typography>
              </Box>

              {recipient && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Người nhận:
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    @{recipient}
                  </Typography>
                </Box>
              )}

              <Divider sx={{ my: 1 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg font-size='16px' viewBox='0 0 48 48' fill='currentColor' xmlns='http://www.w3.org/2000/svg' width='1em' height='1em'%3E%3Cg clip-path='url(%23Icon_Color-Tiktok_Coin_svg__a)'%3E%3Cpath d='M48 24a24 24 0 1 1-48 0 24 24 0 0 1 48 0Z' fill='%23FFB84D'/%3E%3Cpath d='M47 24a23 23 0 1 1-46 0 23 23 0 0 1 46 0Z' fill='%23FFDE55'/%3E%3Cpath d='M42 24a18 18 0 1 1-36 0 18 18 0 0 1 36 0Z' fill='%23F7A300'/%3E%3Cpath d='M42 24a18 18 0 1 1-36 0 18 18 0 0 1 36 0Z' fill='%23F7A80F'/%3E%3Cpath d='M41.94 25.5a18 18 0 1 0-35.88 0 18 18 0 0 1 35.88 0Z' fill='%23E88B00'/%3E%3Cpath d='M41.94 25.5a18 18 0 1 0-35.88 0 18 18 0 0 1 35.88 0Z' fill='%23F09207'/%3E%3Cpath d='M34.74 17.77v5.86c-2.06 0-4.05-.44-5.81-1.55v7.2a7.79 7.79 0 0 1-7.84 7.75 7.79 7.79 0 0 1-7.8-8.35 7.79 7.79 0 0 1 9.19-8.24v6c-.47-.13-.9-.26-1.39-.26a3.14 3.14 0 0 0-3.09 2.5 3.14 3.14 0 0 0 3.1 2.5c1.74 0 3.14-1.4 3.14-3.11V12.03h4.69a5.6 5.6 0 0 0 5.81 5.74Z' fill='%23F09207'/%3E%3Cpath d='M34.34 18.18a5.78 5.78 0 0 1-5.82-5.74h-3.87v15.63c0 1.94-1.6 3.5-3.56 3.5a3.53 3.53 0 0 1-3.55-3.5 3.53 3.53 0 0 1 4.52-3.38v-3.9a7.38 7.38 0 0 0-8.4 7.28 7.38 7.38 0 0 0 7.43 7.34c4.1 0 7.43-3.29 7.43-7.34v-7.98a9.73 9.73 0 0 0 5.82 1.92v-3.83Z' fill='%23fff'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='Icon_Color-Tiktok_Coin_svg__a'%3E%3Cpath fill='%23fff' d='M0 0h48v48H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E")`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Số coin:
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {coins.toLocaleString()} coins
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Payment sx={{ color: '#4caf50', fontSize: 20 }} />
                  <Typography variant="body2" color="text.secondary">
                    Phương thức:
                  </Typography>
                </Box>
                <Chip 
                  label={paymentMethod} 
                  color="primary" 
                  size="small"
                  sx={{ fontWeight: 'bold' }}
                />
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="bold" color="text.primary">
                  Tổng thanh toán:
                </Typography>
                <Typography 
                  variant="h5" 
                  fontWeight="bold"
                  sx={{
                    background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {formatCurrencyVnd(priceVnd)}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* <Box sx={{ mt: 3, p: 2, borderRadius: '8px', backgroundColor: '#e8f5e8' }}>
          <Typography variant="body2" color="#4caf50" textAlign="center">
            ✅ Đã thanh toán thành công! Tiền đã được trừ vào tài khoản của bạn.
          </Typography>
        </Box> */}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={onClose}
          sx={{
            height: 48,
            fontSize: '1.1rem',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #4caf50, #8bc34a)',
            '&:hover': {
              background: 'linear-gradient(45deg, #45a049, #7cb342)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(76, 175, 80, 0.3)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Hoàn thành
        </Button>
      </DialogActions>
    </Dialog>
  )
}
