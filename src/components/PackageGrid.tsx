import React from 'react'
import { Container, Typography, Box } from '@mui/material'
import { CoinCard } from './CoinCard'
import { CoinPackage } from '../types'

interface PackageGridProps {
  packages: CoinPackage[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export const PackageGrid: React.FC<PackageGridProps> = ({
  packages,
  selectedId,
  onSelect,
}) => {
  return (
    <Container maxWidth="md" sx={{ px: 4, py: 3 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          textAlign: 'center', 
          mb: 4, 
          fontWeight: '600',
          color: '#495057',
        }}
      >
        Nhận Xu
      </Typography>
      
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
          maxWidth: 600,
          mx: 'auto',
          p: 0,
        }}
      >
        {packages.map((pkg) => (
          <Box
            key={pkg.id}
            sx={{
              listStyleType: 'none',
              overflow: 'hidden',
            }}
          >
            <CoinCard
              package={pkg}
              isSelected={selectedId === pkg.id}
              onSelect={onSelect}
            />
          </Box>
        ))}
      </Box>
    </Container>
  )
}
