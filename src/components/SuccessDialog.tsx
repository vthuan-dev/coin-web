import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material'
import { formatCurrencyVnd } from '../utils/formatCurrency'
import { HistoryItem } from '../types'

interface SuccessDialogProps {
  open: boolean
  onClose: () => void
  historyItem: HistoryItem | null
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({
  open,
  onClose,
  historyItem,
}) => {
  if (!historyItem) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {historyItem.type === 'recharge' ? 'Nạp Coins thành công' : 'Gửi quà thành công'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {historyItem.type === 'recharge' ? (
            <>
              <Typography>
                <strong>Người nhận:</strong> {historyItem.recipient}
              </Typography>
              <Typography>
                <strong>Số Coins:</strong> {historyItem.coins?.toLocaleString()}
              </Typography>
              <Typography>
                <strong>Giá:</strong> {formatCurrencyVnd(historyItem.priceVnd || 0)}
              </Typography>
            </>
          ) : (
            <>
              <Typography>
                <strong>Người nhận:</strong> {historyItem.recipient}
              </Typography>
              <Typography>
                <strong>Quà tặng:</strong> {historyItem.gift}
              </Typography>
              <Typography>
                <strong>Coins đã sử dụng:</strong> {historyItem.coins}
              </Typography>
            </>
          )}
          <Typography color="text.secondary">
            <strong>Thời gian:</strong> {new Date(historyItem.timestamp).toLocaleString('vi-VN')}
          </Typography>
          {/* <Typography color="text.secondary" variant="body2">
            * Đây là mô phỏng, không có giao dịch thực tế nào được thực hiện
          </Typography> */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  )
}
