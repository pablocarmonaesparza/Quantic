import { useState, useEffect } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown,
  RefreshCw,
  Zap,
  Target,
  BarChart3,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { StatCard } from './components/StatCard';
import { PositionsTable } from './components/PositionsTable';
import { SignalsPanel } from './components/SignalsPanel';
import { PerformanceChart } from './components/PerformanceChart';
import { RecentTrades } from './components/RecentTrades';
import { useDashboardData } from './hooks/useDashboardData';
import { mockData, mockChartData } from './lib/mockData';
import { formatCurrency, formatPercent, cn } from './lib/utils';

function App() {
  const { data: liveData, chartData: liveChartData, loading, error, lastFetch, refetch } = useDashboardData();
  const [isLive, setIsLive] = useState(true);
  
  // Use live data if available, otherwise mock
  const data = liveData || mockData;
  const chartData = liveChartData.length > 0 ? liveChartData : mockChartData;
  const hasLiveData = !!liveData;

  // Auto-refresh when live
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(refetch, 30000);
    return () => clearInterval(interval);
  }, [isLive, refetch]);

  const plType = data.account.dailyPL >= 0 ? 'positive' : 'negative';

  if (loading && !liveData) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={48} className="text-green-400 animate-spin mx-auto mb-4" />
          <p className="text-dark-400">Loading Quantic...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <header className="border-b border-dark-800 bg-dark-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 glow-green">
                <Zap size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Quantic</h1>
                <p className="text-dark-400 text-xs">Autonomous Trading System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Data source indicator */}
              <div className={cn(
                "px-3 py-1 rounded-full text-xs font-medium",
                hasLiveData ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
              )}>
                {hasLiveData ? "📡 LIVE DATA" : "🔄 MOCK DATA"}
              </div>
              
              {error && (
                <div className="flex items-center gap-1 text-red-400 text-sm">
                  <AlertCircle size={14} />
                  <span>Connection Error</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  isLive ? "bg-green-400 animate-pulse" : "bg-dark-500"
                )} />
                <span className="text-dark-400 text-sm">
                  {isLive ? 'Auto-refresh' : 'Paused'}
                </span>
              </div>
              
              <button
                onClick={() => {
                  if (!isLive) refetch();
                  setIsLive(!isLive);
                }}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  isLive ? "bg-green-500/20 text-green-400" : "bg-dark-700 text-dark-400"
                )}
              >
                <RefreshCw size={18} className={isLive ? "animate-spin" : ""} />
              </button>
              
              <div className="text-right">
                <p className="text-dark-400 text-xs">Last Update</p>
                <p className="text-white text-sm font-medium">
                  {lastFetch ? lastFetch.toLocaleTimeString() : 'Never'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Portfolio Value"
            value={formatCurrency(data.account.equity)}
            change={`${formatPercent(data.performance.totalReturnPct)} all time`}
            changeType={data.performance.totalReturn >= 0 ? 'positive' : 'negative'}
            icon={Wallet}
            glow
          />
          <StatCard
            title="Today's P/L"
            value={formatCurrency(data.account.dailyPL)}
            change={formatPercent(data.account.dailyPLPC)}
            changeType={plType}
            icon={plType === 'positive' ? TrendingUp : TrendingDown}
            glow
          />
          <StatCard
            title="Win Rate"
            value={`${(data.performance.winRate * 100).toFixed(0)}%`}
            change={`${data.performance.tradesCount} positions`}
            changeType="neutral"
            icon={Target}
          />
          <StatCard
            title="Sharpe Ratio"
            value={data.performance.sharpeRatio.toFixed(2)}
            change={`Max DD: ${(data.performance.maxDrawdown * 100).toFixed(1)}%`}
            changeType={data.performance.sharpeRatio > 1 ? 'positive' : 'neutral'}
            icon={BarChart3}
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Chart - spans 2 columns */}
          <div className="lg:col-span-2">
            <PerformanceChart data={chartData} />
          </div>
          
          {/* Signals Panel */}
          <div>
            <SignalsPanel sentiment={data.sentiment} />
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Positions Table - spans 2 columns */}
          <div className="lg:col-span-2">
            <PositionsTable positions={data.positions} />
          </div>
          
          {/* Recent Trades */}
          <div>
            <RecentTrades trades={data.recentTrades} />
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 glass rounded-xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-dark-400 text-xs uppercase tracking-wider">Positions</p>
              <p className="text-2xl font-bold text-white">{data.positions.length}</p>
            </div>
            <div>
              <p className="text-dark-400 text-xs uppercase tracking-wider">Cash</p>
              <p className={cn(
                "text-2xl font-bold",
                data.account.cash >= 0 ? "text-green-400" : "text-red-400"
              )}>
                {formatCurrency(data.account.cash)}
              </p>
            </div>
            <div>
              <p className="text-dark-400 text-xs uppercase tracking-wider">Avg Win</p>
              <p className="text-2xl font-bold text-green-400">
                {formatCurrency(data.performance.avgWin)}
              </p>
            </div>
            <div>
              <p className="text-dark-400 text-xs uppercase tracking-wider">Avg Loss</p>
              <p className="text-2xl font-bold text-red-400">
                {formatCurrency(data.performance.avgLoss)}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-800 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between text-dark-500 text-sm">
            <p>Quantic v1.0.0 • Autonomous Trading System</p>
            <p>Data Sources: Twitter • Reddit • Polymarket • Alpaca</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
