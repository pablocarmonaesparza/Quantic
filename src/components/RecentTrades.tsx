import type { Trade } from '../types';
import { cn, formatCurrency, timeAgo } from '../lib/utils';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

interface RecentTradesProps {
  trades: Trade[];
}

export function RecentTrades({ trades }: RecentTradesProps) {
  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Trades</h3>
      
      <div className="space-y-3">
        {trades.map((trade) => (
          <div 
            key={trade.id}
            className={cn(
              "flex items-center justify-between p-3 rounded-lg transition-all",
              trade.action === 'BUY' ? "bg-green-500/10 hover:bg-green-500/20" : "bg-red-500/10 hover:bg-red-500/20"
            )}
          >
            <div className="flex items-center gap-3">
              {trade.action === 'BUY' ? (
                <ArrowUpCircle className="text-green-400" size={24} />
              ) : (
                <ArrowDownCircle className="text-red-400" size={24} />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{trade.ticker}</span>
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full font-medium",
                    trade.action === 'BUY' ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                  )}>
                    {trade.action}
                  </span>
                </div>
                <p className="text-dark-400 text-xs">
                  Signal: {trade.signal.toFixed(2)} • {timeAgo(trade.timestamp)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-medium">{formatCurrency(trade.amount)}</p>
              <p className="text-dark-400 text-xs">@ ${trade.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
        
        {trades.length === 0 && (
          <div className="text-center py-8 text-dark-400">
            No recent trades
          </div>
        )}
      </div>
    </div>
  );
}
