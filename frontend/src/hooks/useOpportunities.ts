```tsx
import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Opportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  skills: string[];
  source: string;
  posted_at: string;
  created_at: string;
  updated_at: string;
}

interface UseOpportunitiesReturn {
  opportunities: Opportunity[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

/**
 * Custom hook that fetches the list of opportunities,
 * handles loading/error states, and polls the API every 30 seconds.
 */
export const useOpportunities = (): UseOpportunitiesReturn => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOpportunities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/opportunities`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data: Opportunity[] = await response.json();
      setOpportunities(data);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load opportunities');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  // Polling every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(fetchOpportunities, 30_000);
    return () => clearInterval(intervalId);
  }, [fetchOpportunities]);

  const refresh = () => {
    fetchOpportunities();
  };

  return { opportunities, loading, error, refresh };
};
```