import React, { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Container,
  AppBar,
  Toolbar,
  InputAdornment,
  Drawer,
  Slide,
} from '@mui/material'
import { ArrowBack, HelpOutline } from '@mui/icons-material'
import { formatCurrencyVnd } from '../utils/formatCurrency'

interface CustomCoinScreenProps {
  open: boolean
  onClose: () => void
  onConfirm: (coins: number) => void
}

export const CustomCoinScreen: React.FC<CustomCoinScreenProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  const [inputValue, setInputValue] = useState('')

  const minCoins = 30
  const maxCoins = 2500000
  const pricePerCoin = 437.5

  const currentCoins = parseInt(inputValue) || 0
  const totalPrice = currentCoins * pricePerCoin

  const handleNumberClick = (number: string) => {
    const newValue = inputValue + number
    const numValue = parseInt(newValue)
    
    if (numValue <= maxCoins) {
      setInputValue(newValue)
    }
  }

  const handleBackspace = () => {
    setInputValue(prev => prev.slice(0, -1))
  }

  const handleClear = () => {
    setInputValue('')
  }

  const handleConfirm = () => {
    if (currentCoins >= minCoins && currentCoins <= maxCoins) {
      onConfirm(currentCoins)
      // Không reset input ở đây, để người dùng thấy số coin đã chọn
    }
  }

  const isInputValid = currentCoins >= minCoins && currentCoins <= maxCoins

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          height: '50vh',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          overflow: 'hidden',
        },
      }}
      SlideComponent={Slide}
      SlideProps={{
        direction: 'up',
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <AppBar 
          position="static" 
          sx={{ 
            backgroundColor: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            borderBottom: '1px solid #e0e0e0'
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between', px: 2, minHeight: 56 }}>
            <IconButton onClick={onClose} sx={{ color: '#1a1a1a' }}>
              <ArrowBack />
            </IconButton>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                color: '#1a1a1a',
              }}
            >
              Custom
            </Typography>
            <IconButton sx={{ color: '#1a1a1a' }}>
              <HelpOutline />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
        {/* Number of Coins Section */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="body2" 
            sx={{ 
              mb: 2, 
              color: 'text.secondary',
              fontWeight: 'bold',
            }}
          >
            Number of Coins
          </Typography>
          
          <TextField
            fullWidth
            value={inputValue}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '') // Chỉ cho phép số
              const numValue = parseInt(value)
              if (!value || (numValue <= maxCoins)) {
                setInputValue(value)
              }
            }}
            placeholder={`${minCoins.toLocaleString()} - ${maxCoins.toLocaleString()}`}
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
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                height: 56,
                fontSize: '1.2rem',
                fontWeight: 'bold',
                '& input': {
                  textAlign: 'center',
                },
              },
            }}
          />
          
          {currentCoins > 0 && currentCoins < minCoins && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              Minimum: {minCoins.toLocaleString()}
            </Typography>
          )}
        </Box>

        {/* Keypad */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 1.5,
              maxWidth: 280,
              mx: 'auto',
            }}
          >
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((number) => (
              <Button
                key={number}
                variant="outlined"
                onClick={() => handleNumberClick(number)}
                sx={{
                  height: 48,
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  borderColor: '#e0e0e0',
                  color: '#1a1a1a',
                  borderRadius: '12px',
                  '&:hover': {
                    borderColor: '#ff4081',
                    backgroundColor: '#fff5f7',
                  },
                }}
              >
                {number}
              </Button>
            ))}
            <Button
              variant="outlined"
              onClick={handleClear}
              sx={{
                height: 48,
                fontSize: '1rem',
                fontWeight: 'bold',
                borderColor: '#e0e0e0',
                color: '#1a1a1a',
                borderRadius: '12px',
                '&:hover': {
                  borderColor: '#ff4081',
                  backgroundColor: '#fff5f7',
                },
              }}
            >
              C
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleNumberClick('0')}
              sx={{
                height: 48,
                fontSize: '1.3rem',
                fontWeight: 'bold',
                borderColor: '#e0e0e0',
                color: '#1a1a1a',
                borderRadius: '12px',
                '&:hover': {
                  borderColor: '#ff4081',
                  backgroundColor: '#fff5f7',
                },
              }}
            >
              0
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleNumberClick('000')}
              sx={{
                height: 48,
                fontSize: '1rem',
                fontWeight: 'bold',
                borderColor: '#e0e0e0',
                color: '#1a1a1a',
                borderRadius: '12px',
                '&:hover': {
                  borderColor: '#ff4081',
                  backgroundColor: '#fff5f7',
                },
              }}
            >
              000
            </Button>
          </Box>
          
          {/* Backspace Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.5 }}>
            <IconButton
              onClick={handleBackspace}
              sx={{
                width: 40,
                height: 40,
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                '&:hover': {
                  borderColor: '#ff4081',
                  backgroundColor: '#fff5f7',
                },
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                ⌫
              </Typography>
            </IconButton>
          </Box>
        </Box>

        {/* Special Offer */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Special offer
          </Typography>
          <Button
            variant="text"
            sx={{
              color: '#ff0050',
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '0.875rem',
              '&:hover': {
                backgroundColor: 'rgba(255, 0, 80, 0.1)',
              },
            }}
          >
            Unlock 5% cash back &gt;
          </Button>
        </Box>

        {/* Total */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            Total
          </Typography>
          <Typography 
            variant="h5" 
            fontWeight="bold"
            sx={{
              background: 'linear-gradient(45deg, #ff0050, #00f2ea)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {formatCurrencyVnd(totalPrice)}
          </Typography>
        </Box>

        {/* Recharge Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleConfirm}
          disabled={!isInputValid}
          sx={{
            height: 48,
            fontSize: '1rem',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #ff0050, #00f2ea)',
            borderRadius: '12px',
            '&:hover': {
              background: 'linear-gradient(45deg, #e6004a, #00d4cc)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(255, 0, 80, 0.3)',
            },
            '&:disabled': {
              background: 'action.disabled',
              transform: 'none',
              boxShadow: 'none',
            },
            transition: 'all 0.3s ease',
          }}
          startIcon={
            <Box
              sx={{
                width: 20,
                height: 20,
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E")`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            />
          }
        >
          Recharge
        </Button>
        </Box>
      </Box>
    </Drawer>
  )
}
