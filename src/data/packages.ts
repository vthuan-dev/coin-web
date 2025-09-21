import { CoinPackage, PaymentMethod } from '../types'

export const coinPackages: CoinPackage[] = [
  { id: '1', coins: 16, priceVnd: 7000, description: '' },
  { id: '2', coins: 70, priceVnd: 31000, description: '' },
  { id: '3', coins: 350, priceVnd: 155000, description: '' },
  { id: '4', coins: 700, priceVnd: 305000, description: '' },
  { id: '5', coins: 1400, priceVnd: 609000, description: '' },
  { id: '6', coins: 3500, priceVnd: 1549000, description: '' },
  { id: '7', coins: 7000, priceVnd: 3049000, description: '' },
  { id: '8', coins: 17500, priceVnd: 7590000, description: '' },
  { id: '9', coins: 0, priceVnd: 0, description: 'Custom' },
]

export const gifts = [
  { id: '1', name: 'Rose', emoji: '🌹', priceCoins: 10 },
  { id: '2', name: 'Heart', emoji: '❤️', priceCoins: 20 },
  { id: '3', name: 'Star', emoji: '⭐', priceCoins: 50 },
  { id: '4', name: 'Crown', emoji: '👑', priceCoins: 100 },
  { id: '5', name: 'Diamond', emoji: '💎', priceCoins: 200 },
  { id: '6', name: 'Rocket', emoji: '🚀', priceCoins: 500 },
]

export const paymentMethods = [
  {
    id: 'paypal',
    name: 'PayPal',
    logo: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%230070ba\'%3E%3Cpath d=\'M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.543-.68v.001c-.608-.624-1.47-1.01-2.527-1.01H8.49c-.524 0-.968.382-1.05.9L6.32 15.73h8.697c3.176 0 5.692-1.006 6.804-3.024 1.01-1.8.846-3.643-.22-5.022z\'/%3E%3C/svg%3E',
    description: 'Thanh toán an toàn và nhanh chóng',
    isRecommended: true,
  },
  {
    id: 'visa',
    name: 'Visa',
    logo: 'https://pngimg.com/d/visa_PNG4.png',
    description: 'Thẻ Visa được chấp nhận rộng rãi',
    isRecommended: false,
  },
]
