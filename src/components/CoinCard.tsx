import React from 'react'
import {
  Box,
  Typography,
  useTheme,
} from '@mui/material'
import { Player } from '@lottiefiles/react-lottie-player'
import { CoinPackage } from '../types'
import { formatCurrencyVnd } from '../utils/formatCurrency'

interface CoinCardProps {
  package: CoinPackage
  isSelected: boolean
  onSelect: (id: string) => void
}

export const CoinCard: React.FC<CoinCardProps> = ({
  package: pkg,
  isSelected,
  onSelect,
}) => {
  const theme = useTheme()

  // Custom package
  if (pkg.description === 'Custom') {
    return (
      <Box
        onClick={() => onSelect(pkg.id)}
        data-package-id={pkg.id}
        sx={{
          width: '100%',
          height: 64,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          // Default state - có viền nhẹ
          backgroundColor: '#f8f9fa',
          border: '2px solid #e0e0e0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transform: 'scale(1)',
          
          // Selected state - viền đậm và màu mè
          ...(isSelected && {
            background: 'linear-gradient(135deg, #ff0050 0%, #ff4081 50%, #00f2ea 100%)',
            border: '3px solid #ff0050',
            boxShadow: '0 8px 25px rgba(255, 0, 80, 0.4), 0 0 20px rgba(0, 242, 234, 0.3)',
            transform: 'scale(1.05)',
          }),
          
          '&:hover': {
            transform: isSelected ? 'scale(1.05)' : 'scale(1.02)',
            boxShadow: isSelected 
              ? '0 12px 35px rgba(255, 0, 80, 0.5), 0 0 25px rgba(0, 242, 234, 0.4)'
              : '0 4px 15px rgba(0,0,0,0.15)',
            borderColor: isSelected ? '#ff0050' : '#ff4081',
          },
        }}
        aria-pressed={isSelected}
      >
        {isSelected && (
          <Box
            sx={{
              position: 'absolute',
              top: -8,
              right: -8,
              zIndex: 1,
            }}
          >
            <Player
              autoplay
              loop
              src="/sparkle.json"
              style={{ width: 28, height: 28 }}
            />
          </Box>
        )}
        
        <Typography 
          variant="body2" 
          fontWeight="bold" 
          sx={{ 
            fontSize: '14px',
            color: isSelected ? 'white' : '#1a1a1a',
            textAlign: 'center',
            wordBreak: 'break-word',
            overflow: 'hidden',
            opacity: 1,
            textShadow: isSelected ? '0 1px 3px rgba(0,0,0,0.3)' : 'none',
          }}
        >
          Custom
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      onClick={() => onSelect(pkg.id)}
      data-package-id={pkg.id}
      sx={{
        width: '100%',
        height: 64,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        // Default state - có viền nhẹ
        backgroundColor: '#ffffff',
        border: '1px solid #dee2e6',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transform: 'scale(1)',
        
        // Selected state - viền đậm và màu mè
        ...(isSelected && {
          backgroundColor: '#f8f9fa',
          border: '2px solid #495057',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          transform: 'scale(1.02)',
        }),
        
        '&:hover': {
          transform: isSelected ? 'scale(1.02)' : 'scale(1.01)',
          boxShadow: isSelected 
            ? '0 4px 12px rgba(0, 0, 0, 0.15)'
            : '0 2px 8px rgba(0,0,0,0.1)',
          borderColor: isSelected ? '#495057' : '#adb5bd',
        },
      }}
      aria-pressed={isSelected}
    >
      {isSelected && (
        <Box
          sx={{
            position: 'absolute',
            top: -8,
            right: -8,
            zIndex: 1,
          }}
        >
          <Player
            autoplay
            loop
            src="/sparkle.json"
            style={{ width: 28, height: 28 }}
          />
        </Box>
      )}
      
      {/* Coin Icon and Amount Row */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          justifyContent: 'center',
          alignItems: 'center',
          mb: 0.5,
        }}
      >
        {/* TikTok Coin SVG Icon */}
        <Box
          sx={{
            width: 16,
            height: 16,
            backgroundImage: `url("data:image/svg+xml,%3Csvg font-size='16px' viewBox='0 0 48 48' fill='currentColor' xmlns='http://www.w3.org/2000/svg' width='1em' height='1em'%3E%3Cg clip-path='url(%23Icon_Color-Tiktok_Coin_svg__a)'%3E%3Cpath d='M48 24a24 24 0 1 1-48 0 24 24 0 0 1 48 0Z' fill='%23FFB84D'/%3E%3Cpath d='M47 24a23 23 0 1 1-46 0 23 23 0 0 1 46 0Z' fill='%23FFDE55'/%3E%3Cpath d='M42 24a18 18 0 1 1-36 0 18 18 0 0 1 36 0Z' fill='%23F7A300'/%3E%3Cpath d='M42 24a18 18 0 1 1-36 0 18 18 0 0 1 36 0Z' fill='%23F7A80F'/%3E%3Cpath d='M41.94 25.5a18 18 0 1 0-35.88 0 18 18 0 0 1 35.88 0Z' fill='%23E88B00'/%3E%3Cpath d='M41.94 25.5a18 18 0 1 0-35.88 0 18 18 0 0 1 35.88 0Z' fill='%23F09207'/%3E%3Cpath d='M34.74 17.77v5.86c-2.06 0-4.05-.44-5.81-1.55v7.2a7.79 7.79 0 0 1-7.84 7.75 7.79 7.79 0 0 1-7.8-8.35 7.79 7.79 0 0 1 9.19-8.24v6c-.47-.13-.9-.26-1.39-.26a3.14 3.14 0 0 0-3.09 2.5 3.14 3.14 0 0 0 3.1 2.5c1.74 0 3.14-1.4 3.14-3.11V12.03h4.69a5.6 5.6 0 0 0 5.81 5.74Z' fill='%23F09207'/%3E%3Cpath d='M34.34 18.18a5.78 5.78 0 0 1-5.82-5.74h-3.87v15.63c0 1.94-1.6 3.5-3.56 3.5a3.53 3.53 0 0 1-3.55-3.5 3.53 3.53 0 0 1 4.52-3.38v-3.9a7.38 7.38 0 0 0-8.4 7.28 7.38 7.38 0 0 0 7.43 7.34c4.1 0 7.43-3.29 7.43-7.34v-7.98a9.73 9.73 0 0 0 5.82 1.92v-3.83Z' fill='%23fff'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='Icon_Color-Tiktok_Coin_svg__a'%3E%3Cpath fill='%23fff' d='M0 0h48v48H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E")`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            filter: isSelected ? 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' : 'none',
            transition: 'filter 0.3s ease',
          }}
        />
        
        {/* Coin Amount */}
        <Typography 
          variant="h6" 
          fontWeight="600" 
          sx={{ 
            fontSize: '16px',
            color: isSelected ? '#495057' : '#212529',
            lineHeight: 1,
          }}
        >
          {pkg.coins}
        </Typography>
      </Box>
      
      {/* Price */}
      <Typography 
        variant="body2" 
        sx={{ 
          fontSize: '12px',
          color: isSelected ? '#6c757d' : '#6c757d',
          fontWeight: 500,
          lineHeight: 1,
        }}
      >
        ₫{pkg.priceVnd.toLocaleString('en-US')}
      </Typography>
    </Box>
  )
}