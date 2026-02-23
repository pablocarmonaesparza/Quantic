import type { MarketSentiment } from '../types';
import { cn, formatSignal } from '../lib/utils';
import { SentimentGauge } from './SentimentGauge';
import { Twitter, MessageSquare, TrendingUp, Building2, Bitcoin } from 'lucide-react';

interface SignalsPanelProps {
  sentiment: MarketSentiment;
}

export function SignalsPanel({ sentiment }: SignalsPanelProps) {
  const sources = [
    { 
      name: 'Twitter', 
      icon: Twitter, 
      signal: sentiment.sources.twitter.signal, 
      count: sentiment.sources.twitter.count,
      color: 'text-blue-400',
      bg: 'bg-blue-500/20'
    },
    { 
      name: 'Reddit', 
      icon: MessageSquare, 
      signal: sentiment.sources.reddit.signal, 
      count: sentiment.sources.reddit.count,
      color: 'text-orange-400',
      bg: 'bg-orange-500/20'
    },
    { 
      name: 'Polymarket', 
      icon: TrendingUp, 
      signal: sentiment.sources.polymarket.signal, 
      count: sentiment.sources.polymarket.count,
      color: 'text-purple-400',
      bg: 'bg-purple-500/20'
    },
  ];

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Market Signals</h3>
      
      {/* Main Gauge */}
      <div className="flex justify-center mb-8">
        <SentimentGauge 
          value={sentiment.overall} 
          label="Combined Signal" 
          size="lg" 
        />
      </div>
      
      {/* Confidence */}
      <div className="text-center mb-6">
        <span className="text-dark-400 text-sm">Confidence: </span>
        <span className="text-white font-semibold">
          {(sentiment.confidence * 100).toFixed(0)}%
        </span>
      </div>
      
      {/* Source Breakdown */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {sources.map((source) => (
          <div key={source.name} className="text-center">
            <div className={cn("inline-flex p-2 rounded-lg mb-2", source.bg)}>
              <source.icon size={20} className={source.color} />
            </div>
            <p className="text-dark-400 text-xs">{source.name}</p>
            <p className={cn(
              "text-lg font-bold",
              source.signal > 0.1 ? "text-green-400" : 
              source.signal < -0.1 ? "text-red-400" : "text-gray-400"
            )}>
              {formatSignal(source.signal)}
            </p>
            <p className="text-dark-500 text-xs">{source.count} signals</p>
          </div>
        ))}
      </div>
      
      {/* Macro Context */}
      <div className="border-t border-dark-700 pt-4">
        <p className="text-dark-400 text-xs uppercase tracking-wider mb-3">Macro Context</p>
        <div className="grid grid-cols-2 gap-4">
          {sentiment.fedSentiment && (
            <div className="flex items-center gap-2">
              <Building2 size={16} className="text-yellow-400" />
              <div>
                <p className="text-dark-400 text-xs">Fed</p>
                <p className={cn(
                  "text-sm font-semibold",
                  sentiment.fedSentiment.sentiment === 'dovish' ? "text-green-400" :
                  sentiment.fedSentiment.sentiment === 'hawkish' ? "text-red-400" : "text-gray-400"
                )}>
                  {sentiment.fedSentiment.sentiment.toUpperCase()}
                </p>
              </div>
            </div>
          )}
          {sentiment.cryptoSentiment && (
            <div className="flex items-center gap-2">
              <Bitcoin size={16} className="text-orange-400" />
              <div>
                <p className="text-dark-400 text-xs">Crypto</p>
                <p className={cn(
                  "text-sm font-semibold",
                  sentiment.cryptoSentiment.sentiment === 'bullish' ? "text-green-400" :
                  sentiment.cryptoSentiment.sentiment === 'bearish' ? "text-red-400" : "text-gray-400"
                )}>
                  {sentiment.cryptoSentiment.sentiment.toUpperCase()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Top Movers */}
      <div className="border-t border-dark-700 pt-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-green-400 text-xs uppercase tracking-wider mb-2">🚀 Bullish</p>
            <div className="space-y-1">
              {sentiment.topBullish.slice(0, 3).map((item) => (
                <div key={item.ticker} className="flex justify-between">
                  <span className="text-white text-sm font-medium">${item.ticker}</span>
                  <span className="text-green-400 text-sm">{formatSignal(item.signal)}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-red-400 text-xs uppercase tracking-wider mb-2">📉 Bearish</p>
            <div className="space-y-1">
              {sentiment.topBearish.slice(0, 3).map((item) => (
                <div key={item.ticker} className="flex justify-between">
                  <span className="text-white text-sm font-medium">${item.ticker}</span>
                  <span className="text-red-400 text-sm">{formatSignal(item.signal)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
