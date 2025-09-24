import React, { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  Collapse,
  IconButton,
} from '@mui/material'
import { ExpandMore, ExpandLess, Payment } from '@mui/icons-material'
import { PaymentMethod } from '../types'

interface PaymentMethodSelectorProps {
  paymentMethods: PaymentMethod[]
  selectedMethod: string | null
  onSelect: (methodId: string) => void
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  paymentMethods,
  selectedMethod,
  onSelect,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const selectedMethodData = paymentMethods.find(method => method.id === selectedMethod)

  return (
    <Box sx={{ mb: 3 }}>
      {/* Header Button */}
      <Button
        fullWidth
        variant="outlined"
        onClick={() => setIsExpanded(!isExpanded)}
        sx={{
          height: 56,
          border: '1px solid #dee2e6',
          borderRadius: '12px',
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: '500',
          color: '#495057',
          backgroundColor: '#ffffff',
          '&:hover': {
            borderColor: '#adb5bd',
            backgroundColor: '#f8f9fa',
            transform: 'translateY(-1px)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          },
          transition: 'all 0.2s ease',
        }}
        startIcon={<Payment sx={{ color: '#6c757d' }} />}
        endIcon={
          isExpanded ? (
            <ExpandLess sx={{ color: '#6c757d' }} />
          ) : (
            <ExpandMore sx={{ color: '#6c757d' }} />
          )
        }
      >
        {selectedMethodData ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 24,
                height: 24,
                backgroundImage: `url("${selectedMethodData.logo}")`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
            />
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {selectedMethodData.name}
            </Typography>
            {selectedMethodData.isRecommended && (
              <Chip 
                label="Recommended" 
                size="small"
                sx={{ 
                  backgroundColor: '#e9ecef',
                  color: '#495057',
                  fontWeight: '500',
                  fontSize: '0.7rem',
                  height: 20,
                }}
              />
            )}
          </Box>
        ) : (
          'Choose payment method'
        )}
      </Button>

      {/* Collapsible Content */}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Box sx={{ mt: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 2, 
              textAlign: 'center', 
              fontWeight: '600',
              color: '#495057',
            }}
          >
            Payment methods
          </Typography>
          
          <RadioGroup
            value={selectedMethod || ''}
            onChange={(e) => {
              onSelect(e.target.value)
              setIsExpanded(false) // Đóng sau khi chọn
            }}
            sx={{ gap: 2 }}
          >
            {paymentMethods.map((method) => (
              <Card
                key={method.id}
                sx={{
                  cursor: 'pointer',
                  border: selectedMethod === method.id ? '2px solid #495057' : '1px solid #dee2e6',
                  borderRadius: '12px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: '#adb5bd',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    transform: 'translateY(-1px)',
                  },
                  ...(selectedMethod === method.id && {
                    backgroundColor: '#f8f9fa',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  }),
                }}
                onClick={() => {
                  onSelect(method.id)
                  setIsExpanded(false) // Đóng sau khi chọn
                }}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <FormControlLabel
                      value={method.id}
                      control={
                        <Radio
                          sx={{
                            color: '#6c757d',
                            '&.Mui-checked': {
                              color: '#495057',
                            },
                          }}
                        />
                      }
                      label=""
                      sx={{ m: 0 }}
                    />
                    
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        backgroundImage: `url("${method.logo}")`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        borderRadius: '8px',
                        backgroundColor: method.id === 'paypal' ? '#f8f9fa' : '#f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    />
                    
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: '600',
                            color: '#495057',
                          }}
                        >
                        {method.name}
                        </Typography>
                        {method.isRecommended && (
                          <Chip 
                            label="Recommended" 
                            size="small"
                            sx={{ 
                              backgroundColor: '#e9ecef',
                              color: '#495057',
                              fontWeight: '500',
                              fontSize: '0.75rem',
                              height: 20,
                            }}
                          />
                        )}
                      </Box>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ fontSize: '0.875rem' }}
                      >
                        {method.description}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </RadioGroup>
        </Box>
      </Collapse>
    </Box>
  )
}
