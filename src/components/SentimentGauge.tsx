import { cn } from '../lib/utils';

interface SentimentGaugeProps {
  value: number; // -1 to 1
  label: string;
  size?: 'sm' | 'md' | 'lg';
}

export function SentimentGauge({ value, label, size = 'md' }: SentimentGaugeProps) {
  // Convert -1 to 1 range to 0 to 100 for positioning
  const position = ((value + 1) / 2) * 100;
  
  const getSentimentLabel = () => {
    if (value > 0.3) return 'BULLISH';
    if (value < -0.3) return 'BEARISH';
    return 'NEUTRAL';
  };

  const getSentimentColor = () => {
    if (value > 0.3) return 'text-green-400';
    if (value < -0.3) return 'text-red-400';
    return 'text-yellow-400';
  };

  const sizes = {
    sm: { height: 'h-2', width: 'w-32', indicator: 'w-3 h-3' },
    md: { height: 'h-3', width: 'w-48', indicator: 'w-4 h-4' },
    lg: { height: 'h-4', width: 'w-64', indicator: 'w-5 h-5' },
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-dark-400 text-xs uppercase tracking-wider">{label}</span>
      
      <div className={cn("relative rounded-full overflow-hidden", sizes[size].height, sizes[size].width)}>
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 opacity-30" />
        
        {/* Active portion */}
        <div 
          className={cn(
            "absolute top-0 bottom-0 left-0 transition-all duration-500",
            value > 0 ? "bg-gradient-to-r from-yellow-500 to-green-500" : "bg-gradient-to-r from-red-500 to-yellow-500"
          )}
          style={{ width: `${position}%` }}
        />
        
        {/* Indicator */}
        <div 
          className={cn(
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white shadow-lg transition-all duration-500",
            sizes[size].indicator
          )}
          style={{ left: `${position}%` }}
        />
      </div>
      
      <div className="flex items-center gap-2">
        <span className={cn("text-lg font-bold", getSentimentColor())}>
          {value >= 0 ? '+' : ''}{value.toFixed(3)}
        </span>
        <span className={cn("text-sm font-medium", getSentimentColor())}>
          {getSentimentLabel()}
        </span>
      </div>
    </div>
  );
}
