import React from 'react'
import {
  TextField,
  Box,
  Typography,
  Container,
  Paper,
} from '@mui/material'
import { validateUsername, getUsernameError } from '../utils/validation'

interface RecipientPanelProps {
  recipient: string
  onRecipientChange: (value: string) => void
  error: string
}

export const RecipientPanel: React.FC<RecipientPanelProps> = ({
  recipient,
  onRecipientChange,
  error,
}) => {
  return (
    <Container maxWidth="sm" sx={{ px: 2, py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: '24px !important',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700,
            textAlign: 'center',
            mb: 4,
            color: '#1a1a1a',
            fontSize: { xs: '1.5rem', sm: '2rem' },
            letterSpacing: '-0.02em',
          }}
        >
          Gift recipient
        </Typography>
        
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter TikTok username"
          value={recipient}
          onChange={(e) => onRecipientChange(e.target.value)}
          error={!!error}
          helperText={error || '2-24 characters, letters, numbers, dots and underscores'}
          aria-invalid={!!error}
          aria-label="TikTok username to send gift"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '16px !important',
              backgroundColor: '#ffffff',
              fontSize: '1rem',
              '& fieldset': {
                borderColor: '#e0e0e0',
                borderWidth: 2,
                borderRadius: '16px !important',
              },
              '&:hover fieldset': {
                borderColor: '#ff0050',
                borderRadius: '16px !important',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#ff0050',
                borderWidth: 2,
                borderRadius: '16px !important',
              },
            },
            '& .MuiInputBase-input': {
              py: 2,
              px: 3,
              fontSize: '1rem',
              fontWeight: 500,
            },
            '& .MuiFormHelperText-root': {
              fontSize: '0.875rem',
              color: error ? '#d32f2f' : '#666666',
              mt: 1,
            },
          }}
        />
      </Paper>
    </Container>
  )
}
