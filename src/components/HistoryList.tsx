import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
  Container,
  Button,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { HistoryItem } from '../types'
import { formatCurrencyVnd } from '../utils/formatCurrency'

interface HistoryListProps {
  history: HistoryItem[]
  onDeleteItem: (id: string) => void
  onClearHistory: () => void
}

export const HistoryList: React.FC<HistoryListProps> = ({
  history,
  onDeleteItem,
  onClearHistory,
}) => {
  if (history.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ px: 2, py: 4, textAlign: 'center' }}>
        <Typography color="text.secondary">
          Chưa có lịch sử giao dịch
        </Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="sm" sx={{ px: 2, py: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Lịch sử giao dịch
        </Typography>
        <Button
          size="small"
          color="error"
          onClick={onClearHistory}
        >
          Xóa tất cả
        </Button>
      </Box>
      
      <List>
        {history.map((item) => (
          <ListItem
            key={item.id}
            sx={{
              border: 1,
              borderColor: 'divider',
              borderRadius: 2,
              mb: 1,
            }}
          >
            <ListItemText
              primary={
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {item.type === 'recharge' ? 'Nạp Coins' : 'Gửi quà'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.recipient && `Người nhận: ${item.recipient}`}
                  </Typography>
                  {item.type === 'recharge' ? (
                    <Typography variant="body2">
                      {item.coins?.toLocaleString()} Coins - {formatCurrencyVnd(item.priceVnd || 0)}
                    </Typography>
                  ) : (
                    <Typography variant="body2">
                      {item.gift} - {item.coins} Coins
                    </Typography>
                  )}
                </Box>
              }
              secondary={
                <Typography variant="caption" color="text.secondary">
                  {new Date(item.timestamp).toLocaleString('vi-VN')}
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => onDeleteItem(item.id)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}
