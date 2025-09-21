export interface CoinPackage {
  id: string
  coins: number
  priceVnd: number
  description: string
}

export interface Gift {
  id: string
  name: string
  emoji: string
  priceCoins: number
}

export interface HistoryItem {
  id: string
  type: 'recharge' | 'gift'
  timestamp: string
  recipient?: string
  coins?: number
  priceVnd?: number
  gift?: string
  status: 'success' | 'failed'
}

export interface PaymentMethod {
  id: string
  name: string
  logo: string
  description: string
  isRecommended?: boolean
}

export interface AppState {
  selectedPackageId: string | null
  selectedPaymentMethod: string | null
  customCoins: number
  recipient: string
  recipientError: string
  isProcessing: boolean
  coinBalance: number
  history: HistoryItem[]
}
