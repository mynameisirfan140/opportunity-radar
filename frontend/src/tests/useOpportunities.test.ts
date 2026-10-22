```tsx
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useOpportunities } from '../hooks/useOpportunities';

// Mock data returned by the API
const mockOpportunities = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    url: 'https://example.com/job/1',
  },
  {
    id: '2',
    title: 'Data Analyst',
    company: 'InfoSolutions',
    location: 'New York, NY',
    url: 'https://example.com/job/2',
  },
];

// Helper component to consume the hook
const TestComponent = () => {
  const { opportunities, loading, error, refetch } = useOpportunities();

  if (loading) return <div data-testid="loading">Loading...</div>;
  if (error) return <div data-testid="error">Error: {error.message}</div>;

  return (
    <div data-testid="test-component">
      {opportunities.length ? (
        <div>Loaded ({opportunities.length} items)</div>
      ) : (
        <div>No opportunities</div>
      )}
    </div>
  );
};

describe('useOpportunities hook', () => {
  beforeEach(() => {
    // Mock fetch globally
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      ok: true,
      json: async () => mockOpportunities,
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('fetches opportunities on mount and updates state', async () => {
    render(<TestComponent />);

    // Initial loading state
    expect(screen.getByTestId('loading')).toBeInTheDocument();

    // Wait for fetch to resolve and component to re-render
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
      expect(screen.getByTestId('test-component')).toHaveTextContent('Loaded (2 items)');
    });

    // Verify that the fetched data matches mock
    const opportunities = screen.getByTestId('test-component').textContent;
    expect(opportunities).toContain('Loaded (2 items)');
  });

  it('refetch updates state with new data', async () => {
    // First fetch
    render(<TestComponent />);
    await waitFor(() => {
      expect(screen.getByTestId('test-component')).toHaveTextContent('Loaded (2 items)');
    });

    // Mock a new response
    const newData = [
      {
        id: '3',
        title: 'Product Manager',
        company: 'LaunchCo',
        location: 'Remote',
        url: 'https://example.com/job/3',
      },
    ];
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: async () => newData,
      })
    );

    // Trigger refetch
    const { refetch } = useOpportunities();
    await refetch();

    // Wait for updated state
    await waitFor(() => {
      expect(screen.getByTestId('test-component')).toHaveTextContent('Loaded (1 items)');
    });
  });
});