import { useState, useEffect, useCallback } from 'react';
import type { DashboardData } from '../types';

const DATA_URL = '/data.json';
const REFRESH_INTERVAL = 30000; // 30 seconds

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [chartData, setChartData] = useState<{ date: string; equity: number; pl: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(DATA_URL + '?t=' + Date.now());
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const json = await response.json();
      
      setData({
        account: json.account,
        positions: json.positions,
        sentiment: json.sentiment,
        signals: json.signals || [],
        recentTrades: json.recentTrades || [],
        performance: json.performance,
        lastUpdated: json.lastUpdated
      });
      
      setChartData(json.chartData || []);
      setLastFetch(new Date());
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    
    const interval = setInterval(fetchData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { data, chartData, loading, error, lastFetch, refetch: fetchData };
}
