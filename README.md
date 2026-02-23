# 🚀 Quantic

**Autonomous Trading Dashboard** - A real-time monitoring system for algorithmic trading operations.

![Quantic Dashboard](https://img.shields.io/badge/Status-Live-green?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- **Real-time Portfolio Tracking** - Live equity, P/L, and position updates
- **Multi-Source Signal Aggregation** - Twitter, Reddit, and Polymarket sentiment analysis
- **Interactive Performance Charts** - Historical equity curves with Recharts
- **Position Management** - Visual tracking of all active positions with P/L
- **Trade History** - Recent trades with signal strength indicators
- **Macro Context** - Fed and crypto sentiment from prediction markets
- **Dark Mode UI** - Beautiful, modern dark theme with glow effects

## 📊 Data Sources

| Source | Type | Description |
|--------|------|-------------|
| **Twitter/X** | Sentiment | High-impact account monitoring via bird CLI |
| **Reddit** | Sentiment | r/wallstreetbets and r/stocks scraping via Apify |
| **Polymarket** | Predictions | Real-money prediction market odds |
| **Alpaca** | Trading | Paper/live trading execution |
| **Yahoo Finance** | Market Data | Technical indicators and prices |

## 🛠️ Tech Stack

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **TailwindCSS** - Styling
- **Recharts** - Charts
- **Lucide React** - Icons
- **TanStack Query** - Data Fetching (ready for API integration)

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/pablocarmonaesparza/Quantic.git
cd Quantic

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
quantic/
├── src/
│   ├── components/       # React components
│   │   ├── StatCard.tsx
│   │   ├── SentimentGauge.tsx
│   │   ├── PositionsTable.tsx
│   │   ├── SignalsPanel.tsx
│   │   ├── PerformanceChart.tsx
│   │   └── RecentTrades.tsx
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and mock data
│   ├── types/            # TypeScript type definitions
│   ├── api/              # API integration (ready)
│   ├── App.tsx           # Main app component
│   └── index.css         # Global styles
├── public/
└── package.json
```

## 🔌 API Integration

The dashboard is built to integrate with the Autonomous Trader backend. To connect:

1. Create an API endpoint that returns `DashboardData` type
2. Use TanStack Query hooks in `src/hooks/`
3. Replace mock data with real API calls

Example API response structure:

```typescript
interface DashboardData {
  account: AccountInfo;
  positions: Position[];
  sentiment: MarketSentiment;
  signals: AggregatedSignal[];
  recentTrades: Trade[];
  performance: PerformanceMetrics;
  lastUpdated: string;
}
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:

```js
colors: {
  quantic: {
    500: '#22c55e',  // Primary green
    // ...
  }
}
```

### Signal Sources
Add new signal sources in `src/components/SignalsPanel.tsx`

## 📈 Roadmap

- [ ] WebSocket real-time updates
- [ ] Mobile responsive design
- [ ] Trade execution from dashboard
- [ ] Backtesting visualization
- [ ] Alert notifications
- [ ] Multi-strategy support

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with ⚡ by Pablo Carmona | Part of the Autonomous Trading System
