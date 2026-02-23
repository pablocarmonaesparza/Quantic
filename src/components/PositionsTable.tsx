import type { Position } from '../types';
import { cn, formatCurrency, formatPercent } from '../lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PositionsTableProps {
  positions: Position[];
}

export function PositionsTable({ positions }: PositionsTableProps) {
  const sortedPositions = [...positions].sort(
    (a, b) => b.unrealizedPLPC - a.unrealizedPLPC
  );

  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="p-4 border-b border-dark-700">
        <h3 className="text-lg font-semibold text-white">Positions</h3>
        <p className="text-dark-400 text-sm">{positions.length} active positions</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-dark-800/50">
              <th className="px-4 py-3 text-left text-xs font-medium text-dark-400 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-dark-400 uppercase tracking-wider">
                Qty
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-dark-400 uppercase tracking-wider">
                Avg Entry
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-dark-400 uppercase tracking-wider">
                Current
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-dark-400 uppercase tracking-wider">
                P/L
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-dark-400 uppercase tracking-wider">
                %
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-700">
            {sortedPositions.map((position) => (
              <tr 
                key={position.symbol}
                className="hover:bg-dark-800/30 transition-colors"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      position.unrealizedPL >= 0 ? "bg-green-400" : "bg-red-400"
                    )} />
                    <span className="font-semibold text-white">{position.symbol}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-right text-dark-300">
                  {position.qty.toFixed(2)}
                </td>
                <td className="px-4 py-4 text-right text-dark-300">
                  ${position.avgEntry.toFixed(2)}
                </td>
                <td className="px-4 py-4 text-right text-white font-medium">
                  ${position.currentPrice.toFixed(2)}
                </td>
                <td className={cn(
                  "px-4 py-4 text-right font-medium",
                  position.unrealizedPL >= 0 ? "text-green-400" : "text-red-400"
                )}>
                  <div className="flex items-center justify-end gap-1">
                    {position.unrealizedPL >= 0 ? (
                      <TrendingUp size={14} />
                    ) : (
                      <TrendingDown size={14} />
                    )}
                    {formatCurrency(position.unrealizedPL)}
                  </div>
                </td>
                <td className={cn(
                  "px-4 py-4 text-right font-bold",
                  position.unrealizedPLPC >= 0 ? "text-green-400" : "text-red-400"
                )}>
                  {formatPercent(position.unrealizedPLPC)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
