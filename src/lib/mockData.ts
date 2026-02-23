import type { DashboardData } from '../types';

export const mockData: DashboardData = {
  account: {
    equity: 100814.97,
    cash: -8449.55,
    buyingPower: 91365.42,
    dailyPL: 1410.04,
    dailyPLPC: 0.014,
  },
  positions: [
    { symbol: 'ASTS', qty: 428.52, avgEntry: 23.32, currentPrice: 24.72, unrealizedPL: 599, unrealizedPLPC: 0.060, marketValue: 10596 },
    { symbol: 'IONQ', qty: 240.85, avgEntry: 33.48, currentPrice: 34.22, unrealizedPL: 178, unrealizedPLPC: 0.022, marketValue: 8241 },
    { symbol: 'MARA', qty: 289.23, avgEntry: 20.12, currentPrice: 20.48, unrealizedPL: 105, unrealizedPLPC: 0.018, marketValue: 5924 },
    { symbol: 'RGTI', qty: 752.14, avgEntry: 7.88, currentPrice: 8.01, unrealizedPL: 100, unrealizedPLPC: 0.017, marketValue: 6025 },
    { symbol: 'SOXL', qty: 188.52, avgEntry: 52.18, currentPrice: 52.96, unrealizedPL: 148, unrealizedPLPC: 0.015, marketValue: 9984 },
    { symbol: 'TQQQ', qty: 125.67, avgEntry: 78.45, currentPrice: 79.12, unrealizedPL: 84, unrealizedPLPC: 0.009, marketValue: 9943 },
    { symbol: 'MSTR', qty: 28.34, avgEntry: 312.45, currentPrice: 315.82, unrealizedPL: 96, unrealizedPLPC: 0.011, marketValue: 8950 },
    { symbol: 'COIN', qty: 42.18, avgEntry: 215.32, currentPrice: 218.45, unrealizedPL: 132, unrealizedPLPC: 0.015, marketValue: 9214 },
    { symbol: 'LUNR', qty: 523.45, avgEntry: 8.72, currentPrice: 8.88, unrealizedPL: 84, unrealizedPLPC: 0.018, marketValue: 4648 },
    { symbol: 'RKLB', qty: 412.32, avgEntry: 22.45, currentPrice: 22.12, unrealizedPL: -136, unrealizedPLPC: -0.015, marketValue: 9120 },
    { symbol: 'QUBT', qty: 892.45, avgEntry: 6.78, currentPrice: 6.92, unrealizedPL: 125, unrealizedPLPC: 0.021, marketValue: 6176 },
    { symbol: 'FNGU', qty: 35.67, avgEntry: 285.42, currentPrice: 288.12, unrealizedPL: 96, unrealizedPLPC: 0.009, marketValue: 10278 },
    { symbol: 'LABU', qty: 142.85, avgEntry: 48.92, currentPrice: 48.45, unrealizedPL: -67, unrealizedPLPC: -0.010, marketValue: 6921 },
    { symbol: 'RIOT', qty: 328.92, avgEntry: 12.45, currentPrice: 12.62, unrealizedPL: 56, unrealizedPLPC: 0.014, marketValue: 4151 },
  ],
  sentiment: {
    overall: 0.171,
    direction: 'bullish',
    confidence: 0.47,
    sources: {
      twitter: { signal: -0.078, count: 74 },
      reddit: { signal: -0.300, count: 3 },
      polymarket: { signal: 0.824, count: 36 },
    },
    topBullish: [
      { ticker: 'NVDA', signal: 0.45 },
      { ticker: 'ASTS', signal: 0.38 },
      { ticker: 'COIN', signal: 0.32 },
    ],
    topBearish: [
      { ticker: 'TSLA', signal: -0.28 },
      { ticker: 'GME', signal: -0.22 },
      { ticker: 'AMC', signal: -0.18 },
    ],
    fedSentiment: { sentiment: 'dovish', strength: 0.65 },
    cryptoSentiment: { sentiment: 'bullish', strength: 0.72 },
  },
  signals: [],
  recentTrades: [
    { id: '1', timestamp: new Date().toISOString(), action: 'BUY', ticker: 'ASTS', amount: 2500, price: 24.52, signal: 0.78 },
    { id: '2', timestamp: new Date(Date.now() - 3600000).toISOString(), action: 'BUY', ticker: 'IONQ', amount: 1800, price: 33.85, signal: 0.72 },
    { id: '3', timestamp: new Date(Date.now() - 7200000).toISOString(), action: 'SELL', ticker: 'PLTR', amount: 3200, price: 28.42, signal: 0.35, reason: 'Take profit' },
  ],
  performance: {
    totalReturn: 814.97,
    totalReturnPct: 0.0082,
    winRate: 0.65,
    sharpeRatio: 1.24,
    maxDrawdown: 0.08,
    tradesCount: 47,
    avgWin: 285,
    avgLoss: -142,
  },
  lastUpdated: new Date().toISOString(),
};

export const mockChartData = [
  { date: 'Feb 17', equity: 100000, pl: 0 },
  { date: 'Feb 18', equity: 100250, pl: 250 },
  { date: 'Feb 19', equity: 99850, pl: -400 },
  { date: 'Feb 20', equity: 100420, pl: 570 },
  { date: 'Feb 21', equity: 100180, pl: -240 },
  { date: 'Feb 22', equity: 100650, pl: 470 },
  { date: 'Feb 23', equity: 100815, pl: 165 },
];
