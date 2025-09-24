import React, { useState, useReducer } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { PackageGrid } from './components/PackageGrid'
import { RecipientPanel } from './components/RecipientPanel'
import { PayBar } from './components/PayBar'
import { PaymentMethodSelector } from './components/PaymentMethodSelector'
import { CustomCoinScreen } from './components/CustomCoinScreen'
import { PaymentSuccessDialog } from './components/PaymentSuccessDialog'
import { SuccessDialog } from './components/SuccessDialog'
import { GiftPanel } from './components/GiftPanel'
import { HistoryList } from './components/HistoryList'
import { coinPackages, paymentMethods } from './data/packages'
import { AppState, HistoryItem, Gift } from './types'
import { validateUsername, getUsernameError } from './utils/validation'

type AppAction =
  | { type: 'SELECT_PACKAGE'; payload: string }
  | { type: 'SELECT_PAYMENT_METHOD'; payload: string }
  | { type: 'SET_CUSTOM_COINS'; payload: number }
  | { type: 'SET_RECIPIENT'; payload: string }
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'ADD_HISTORY'; payload: HistoryItem }
  | { type: 'DELETE_HISTORY'; payload: string }
  | { type: 'CLEAR_HISTORY' }
  | { type: 'UPDATE_BALANCE'; payload: number }

const initialState: AppState = {
  selectedPackageId: null,
  selectedPaymentMethod: null,
  customCoins: 0,
  recipient: '',
  recipientError: '',
  isProcessing: false,
  coinBalance: 0,
  history: [],
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SELECT_PACKAGE':
      return { ...state, selectedPackageId: action.payload, customCoins: 0 }
    case 'SELECT_PAYMENT_METHOD':
      return { ...state, selectedPaymentMethod: action.payload }
    case 'SET_CUSTOM_COINS':
      return { ...state, customCoins: action.payload, selectedPackageId: null }
    case 'SET_RECIPIENT':
      const error = getUsernameError(action.payload)
      return { ...state, recipient: action.payload, recipientError: error }
    case 'SET_PROCESSING':
      return { ...state, isProcessing: action.payload }
    case 'ADD_HISTORY':
      return { ...state, history: [action.payload, ...state.history] }
    case 'DELETE_HISTORY':
      return { ...state, history: state.history.filter(item => item.id !== action.payload) }
    case 'CLEAR_HISTORY':
      return { ...state, history: [] }
    case 'UPDATE_BALANCE':
      return { ...state, coinBalance: action.payload }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showPaymentSuccessDialog, setShowPaymentSuccessDialog] = useState(false)
  const [showCustomScreen, setShowCustomScreen] = useState(false)
  const [successHistoryItem, setSuccessHistoryItem] = useState<HistoryItem | null>(null)
  const [paymentOrderDetails, setPaymentOrderDetails] = useState<any>(null)
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  })

  const selectedPackage = coinPackages.find(pkg => pkg.id === state.selectedPackageId)
  const isCustomSelected = state.customCoins > 0
  const currentCoins = isCustomSelected ? state.customCoins : (selectedPackage?.coins || 0)
  const currentPrice = isCustomSelected ? state.customCoins * 437.5 : (selectedPackage?.priceVnd || 0) // 437.5 VND per coin
  const isValid = (selectedPackage || isCustomSelected) && validateUsername(state.recipient) && state.selectedPaymentMethod && !state.isProcessing

  const handleRecharge = async () => {
    if (!isValid) return

    dispatch({ type: 'SET_PROCESSING', payload: true })

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    const orderId = `TTC${Date.now().toString().slice(-8)}`
    const timestamp = new Date().toISOString()
    const selectedPaymentMethodData = paymentMethods.find(method => method.id === state.selectedPaymentMethod)

    const historyItem: HistoryItem = {
      id: orderId,
      type: 'recharge',
      timestamp,
      recipient: state.recipient,
      coins: currentCoins,
      priceVnd: currentPrice,
      status: 'success'
    }

    const orderDetails = {
      coins: currentCoins,
      priceVnd: currentPrice,
      paymentMethod: selectedPaymentMethodData?.name || 'Unknown',
      recipient: state.recipient,
      orderId,
      timestamp,
    }

    dispatch({ type: 'ADD_HISTORY', payload: historyItem })
    dispatch({ type: 'UPDATE_BALANCE', payload: state.coinBalance + currentCoins })
    dispatch({ type: 'SET_PROCESSING', payload: false })

    setPaymentOrderDetails(orderDetails)
    setShowPaymentSuccessDialog(true)
  }

  const handleSendGift = async (gift: Gift) => {
    if (state.coinBalance < gift.priceCoins) return

    dispatch({ type: 'SET_PROCESSING', payload: true })

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const historyItem: HistoryItem = {
      id: Date.now().toString(),
      type: 'gift',
      timestamp: new Date().toISOString(),
      recipient: state.recipient,
      coins: gift.priceCoins,
      gift: `${gift.emoji} ${gift.name}`,
      status: 'success'
    }

    dispatch({ type: 'ADD_HISTORY', payload: historyItem })
    dispatch({ type: 'UPDATE_BALANCE', payload: state.coinBalance - gift.priceCoins })
    dispatch({ type: 'SET_PROCESSING', payload: false })

    setSuccessHistoryItem(historyItem)
    setShowSuccessDialog(true)
  }

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false)
    setSuccessHistoryItem(null)
  }

  const handleDeleteHistory = (id: string) => {
    dispatch({ type: 'DELETE_HISTORY', payload: id })
    setSnackbar({ open: true, message: 'Transaction deleted', severity: 'success' })
  }

  const handleClearHistory = () => {
    dispatch({ type: 'CLEAR_HISTORY' })
    setSnackbar({ open: true, message: 'All history cleared', severity: 'success' })
  }

  const handleCustomPackageSelect = () => {
    setShowCustomScreen(true)
  }

  const handleCustomCoinConfirm = (coins: number) => {
    dispatch({ type: 'SET_CUSTOM_COINS', payload: coins })
    setShowCustomScreen(false)
    setSnackbar({ 
      open: true, 
      message: `Selected ${coins.toLocaleString('en-US')} custom coins. Please choose a payment method.`, 
      severity: 'success' 
    })
  }


  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderBottom: '1px solid #e0e0e0'
        }}
      >
        <Toolbar sx={{ py: 1, justifyContent: 'flex-start', px: 3 }}>
          <Box
            sx={{
              width: 100,
              height: 32,
              backgroundImage: 'url(/tiktok-logo-new.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'left',
            }}
          />
        </Toolbar>
      </AppBar>

      <Box sx={{ pb: 10 }}>
        <RecipientPanel
          recipient={state.recipient}
          onRecipientChange={(value) => dispatch({ type: 'SET_RECIPIENT', payload: value })}
          error={state.recipientError}
        />

        <PackageGrid
          packages={coinPackages}
          selectedId={state.selectedPackageId}
          onSelect={(id) => {
            if (id === '9') { // Custom package
              handleCustomPackageSelect()
            } else {
              dispatch({ type: 'SELECT_PACKAGE', payload: id })
            }
          }}
        />


        <Container maxWidth="sm" sx={{ px: 4, py: 2 }}>
          <PaymentMethodSelector
            paymentMethods={paymentMethods}
            selectedMethod={state.selectedPaymentMethod}
            onSelect={(methodId) => dispatch({ type: 'SELECT_PAYMENT_METHOD', payload: methodId })}
          />
        </Container>

        <PayBar
          selectedPackage={selectedPackage || null}
          customCoins={state.customCoins}
          currentCoins={currentCoins}
          currentPrice={currentPrice}
          selectedPaymentMethod={state.selectedPaymentMethod}
          isProcessing={state.isProcessing}
          onRecharge={handleRecharge}
        />

        {state.coinBalance > 0 && (
          <GiftPanel
            coinBalance={state.coinBalance}
            onSendGift={handleSendGift}
            isProcessing={state.isProcessing}
          />
        )}

        <HistoryList
          history={state.history}
          onDeleteItem={handleDeleteHistory}
          onClearHistory={handleClearHistory}
        />
      </Box>

      <SuccessDialog
        open={showSuccessDialog}
        onClose={handleCloseSuccessDialog}
        historyItem={successHistoryItem}
      />

      <PaymentSuccessDialog
        open={showPaymentSuccessDialog}
        onClose={() => setShowPaymentSuccessDialog(false)}
        orderDetails={paymentOrderDetails}
      />

      <CustomCoinScreen
        open={showCustomScreen}
        onClose={() => setShowCustomScreen(false)}
        onConfirm={handleCustomCoinConfirm}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default App
