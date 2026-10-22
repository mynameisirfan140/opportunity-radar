```tsx
import React from 'react';
import './OpportunityCard.css';

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

/**
 * OpportunityCard – displays a single opportunity with hover effects.
 * The title is a clickable link that opens in a new tab.
 */
const OpportunityCard: React.FC<{ opportunity: Opportunity }> = ({ opportunity }) => {
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.open(opportunity.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="opportunity-card" aria-labelledby="card-title">
      <a
        href={opportunity.url}
        target="_blank"
        rel="noopener noreferrer"
        role="link"
        tabIndex={0}
        onKeyDown={handleKey}
        className="card-link"
      >
        <div className="card-body">
          <h3 id="card-title" className="card-title">
            {opportunity.title}
          </h3>
          <p className="card-company">{opportunity.company} • {opportunity.location}</p>
          <p className="card-description" style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {opportunity.description}
          </p>
          <p className="card-meta">
            <small>
              {new Date(opportunity.posted_at).toLocaleDateString()} • {' '}
              {opportunity.source}
            </small>
          </p>
        </div>
      </a>
    </div>
  );
};

export default OpportunityCard;
```