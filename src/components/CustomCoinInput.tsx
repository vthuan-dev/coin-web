import React, { useState } from 'react'
import {
  Box,
  TextField,
  Typography,
  Card,
  CardContent,
  InputAdornment,
} from '@mui/material'
import { AttachMoney } from '@mui/icons-material'

interface CustomCoinInputProps {
  value: number
  onChange: (value: number) => void
  pricePerCoin: number
}

export const CustomCoinInput: React.FC<CustomCoinInputProps> = ({
  value,
  onChange,
  pricePerCoin,
}) => {
  const [inputValue, setInputValue] = useState(value.toString())

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setInputValue(newValue)
    
    const numValue = parseInt(newValue) || 0
    if (numValue >= 0) {
      onChange(numValue)
    }
  }

  const totalPrice = value * pricePerCoin

  return (
    <Card
      sx={{
        border: '2px solid #e0e0e0',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: '#ff4081',
          boxShadow: '0 4px 20px rgba(255, 0, 80, 0.1)',
        },
        '&:focus-within': {
          borderColor: '#ff0050',
          boxShadow: '0 4px 20px rgba(255, 0, 80, 0.2)',
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2, 
            textAlign: 'center', 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #ff0050, #00f2ea)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Enter custom coins
        </Typography>
        
        <TextField
          fullWidth
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter number of coins to buy"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg font-size='16px' viewBox='0 0 48 48' fill='currentColor' xmlns='http://www.w3.org/2000/svg' width='1em' height='1em'%3E%3Cg clip-path='url(%23Icon_Color-Tiktok_Coin_svg__a)'%3E%3Cpath d='M48 24a24 24 0 1 1-48 0 24 24 0 0 1 48 0Z' fill='%23FFB84D'/%3E%3Cpath d='M47 24a23 23 0 1 1-46 0 23 23 0 0 1 46 0Z' fill='%23FFDE55'/%3E%3Cpath d='M42 24a18 18 0 1 1-36 0 18 18 0 0 1 36 0Z' fill='%23F7A300'/%3E%3Cpath d='M42 24a18 18 0 1 1-36 0 18 18 0 0 1 36 0Z' fill='%23F7A80F'/%3E%3Cpath d='M41.94 25.5a18 18 0 1 0-35.88 0 18 18 0 0 1 35.88 0Z' fill='%23E88B00'/%3E%3Cpath d='M41.94 25.5a18 18 0 1 0-35.88 0 18 18 0 0 1 35.88 0Z' fill='%23F09207'/%3E%3Cpath d='M34.74 17.77v5.86c-2.06 0-4.05-.44-5.81-1.55v7.2a7.79 7.79 0 0 1-7.84 7.75 7.79 7.79 0 0 1-7.8-8.35 7.79 7.79 0 0 1 9.19-8.24v6c-.47-.13-.9-.26-1.39-.26a3.14 3.14 0 0 0-3.09 2.5 3.14 3.14 0 0 0 3.1 2.5c1.74 0 3.14-1.4 3.14-3.11V12.03h4.69a5.6 5.6 0 0 0 5.81 5.74Z' fill='%23F09207'/%3E%3Cpath d='M34.34 18.18a5.78 5.78 0 0 1-5.82-5.74h-3.87v15.63c0 1.94-1.6 3.5-3.56 3.5a3.53 3.53 0 0 1-3.55-3.5 3.53 3.53 0 0 1 4.52-3.38v-3.9a7.38 7.38 0 0 0-8.4 7.28 7.38 7.38 0 0 0 7.43 7.34c4.1 0 7.43-3.29 7.43-7.34v-7.98a9.73 9.73 0 0 0 5.82 1.92v-3.83Z' fill='%23fff'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='Icon_Color-Tiktok_Coin_svg__a'%3E%3Cpath fill='%23fff' d='M0 0h48v48H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E")`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Typography variant="body2" color="text.secondary">
                  coins
                </Typography>
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ff4081',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#ff0050',
                borderWidth: 2,
              },
            },
          }}
        />
        
        {value > 0 && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, rgba(255, 0, 80, 0.05), rgba(0, 242, 234, 0.05))',
              border: '1px solid rgba(255, 0, 80, 0.2)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Total coins:
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="primary">
                {value.toLocaleString('en-US')} coins
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Total price:
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="primary">
                ₫{totalPrice.toLocaleString('en-US')}
              </Typography>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
