CREATE TABLE opportunities (
    id VARCHAR(36) PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT,
    location TEXT,
    description TEXT,
    url TEXT,
    skills TEXT[] DEFAULT ARRAY[]::text[],
    source TEXT NOT NULL,
    posted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_opportunity_title ON opportunities (title);
CREATE INDEX idx_opportunity_company ON opportunities (company);
CREATE INDEX idx_opportunity_source ON opportunities (source);