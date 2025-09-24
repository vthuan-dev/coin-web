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
        {historyItem.type === 'recharge' ? 'Coins recharged successfully' : 'Gift sent successfully'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {historyItem.type === 'recharge' ? (
            <>
              <Typography>
                <strong>Recipient:</strong> {historyItem.recipient}
              </Typography>
              <Typography>
                <strong>Coins:</strong> {historyItem.coins?.toLocaleString('en-US')}
              </Typography>
              <Typography>
                <strong>Price:</strong> {formatCurrencyVnd(historyItem.priceVnd || 0)}
              </Typography>
            </>
          ) : (
            <>
              <Typography>
                <strong>Recipient:</strong> {historyItem.recipient}
              </Typography>
              <Typography>
                <strong>Gift:</strong> {historyItem.gift}
              </Typography>
              <Typography>
                <strong>Coins used:</strong> {historyItem.coins}
              </Typography>
            </>
          )}
          <Typography color="text.secondary">
            <strong>Time:</strong> {new Date(historyItem.timestamp).toLocaleString('en-US')}
          </Typography>
          {/* <Typography color="text.secondary" variant="body2">
            * Đây là mô phỏng, không có giao dịch thực tế nào được thực hiện
          </Typography> */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
