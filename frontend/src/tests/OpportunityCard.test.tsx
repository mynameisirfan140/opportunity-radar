```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import OpportunityCard from '../components/OpportunityCard';

// Sample opportunity data
const mockOpportunity = {
  id: '1',
  title: 'Senior Frontend Engineer',
  company: 'TechCorp',
  location: 'San Francisco, CA',
  description: 'Full-time remote position.',
  url: 'https://example.com/job/1',
};

describe('OpportunityCard', () => {
  it('renders all opportunity fields correctly', () => {
    render(<OpportunityCard opportunity={mockOpportunity} />);

    // Title
    expect(screen.getByRole('heading', { name: mockOpportunity.title })).toBeInTheDocument();

    // Company
    expect(screen.getByText(mockOpportunity.company)).toBeInTheDocument();

    // Location
    expect(screen.getByText(mockOpportunity.location)).toBeInTheDocument();

    // Description
    expect(screen.getByText(mockOpportunity.description)).toBeInTheDocument();

    // Link
    const link = screen.getByRole('link', { name: mockOpportunity.title });
    expect(link).toHaveAttribute('href', mockOpportunity.url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');

    // Accessibility: card should be focusable via keyboard
    const card = screen.getByRole('button'); // Assuming card uses button role for accessibility
    expect(card).toBeFocusable();
  });

  it('calls navigation on link click', () => {
    const handleClick = jest.fn();
    render(<OpportunityCard opportunity={mockOpportunity} onClick={handleClick} />);

    const link = screen.getByRole('link', { name: mockOpportunity.title });
    fireEvent.click(link);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});