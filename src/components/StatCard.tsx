import { cn } from '../lib/utils';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;
  glow?: boolean;
}

export function StatCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon: Icon,
  glow = false 
}: StatCardProps) {
  return (
    <div className={cn(
      "glass rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
      glow && changeType === 'positive' && "glow-green",
      glow && changeType === 'negative' && "glow-red"
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-dark-400 text-sm font-medium uppercase tracking-wider">
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold text-white number-up">
            {value}
          </p>
          {change && (
            <p className={cn(
              "mt-1 text-sm font-medium",
              changeType === 'positive' && "text-green-400",
              changeType === 'negative' && "text-red-400",
              changeType === 'neutral' && "text-dark-400"
            )}>
              {change}
            </p>
          )}
        </div>
        {Icon && (
          <div className={cn(
            "p-3 rounded-lg",
            changeType === 'positive' && "bg-green-500/20 text-green-400",
            changeType === 'negative' && "bg-red-500/20 text-red-400",
            changeType === 'neutral' && "bg-dark-700 text-dark-400"
          )}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  );
}
