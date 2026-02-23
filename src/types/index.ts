export interface Position {
  symbol: string;
  qty: number;
  avgEntry: number;
  currentPrice: number;
  unrealizedPL: number;
  unrealizedPLPC: number;
  marketValue: number;
}

export interface AccountInfo {
  equity: number;
  cash: number;
  buyingPower: number;
  dailyPL: number;
  dailyPLPC: number;
}

export interface Signal {
  source: 'twitter' | 'reddit' | 'polymarket';
  ticker?: string;
  direction: 'bullish' | 'bearish' | 'neutral';
  strength: number;
  confidence: number;
  timestamp: string;
}

export interface AggregatedSignal {
  ticker: string;
  combined: number;
  direction: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  twitter: number;
  reddit: number;
  polymarket: number;
  twitterMentions: number;
  redditMentions: number;
  polymarketMarkets: number;
}

export interface MarketSentiment {
  overall: number;
  direction: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  sources: {
    twitter: { signal: number; count: number };
    reddit: { signal: number; count: number };
    polymarket: { signal: number; count: number };
  };
  topBullish: { ticker: string; signal: number }[];
  topBearish: { ticker: string; signal: number }[];
  fedSentiment?: { sentiment: string; strength: number };
  cryptoSentiment?: { sentiment: string; strength: number };
}

export interface Trade {
  id: string;
  timestamp: string;
  action: 'BUY' | 'SELL';
  ticker: string;
  amount: number;
  price: number;
  signal: number;
  reason?: string;
}

export interface PerformanceMetrics {
  totalReturn: number;
  totalReturnPct: number;
  winRate: number;
  sharpeRatio: number;
  maxDrawdown: number;
  tradesCount: number;
  avgWin: number;
  avgLoss: number;
}

export interface DashboardData {
  account: AccountInfo;
  positions: Position[];
  sentiment: MarketSentiment;
  signals: AggregatedSignal[];
  recentTrades: Trade[];
  performance: PerformanceMetrics;
  lastUpdated: string;
}
