# Opportunity Radar

A lightweight browser extension that continuously scans job boards, LinkedIn, and local news for emerging opportunities that match your skills, delivering real‑time alerts.

## Features
- Real‑time scanning of job boards, LinkedIn, and news sources
- Skill‑based matching with customizable filters
- Live alerts via browser notifications and in‑app toast messages
- Interactive workspace with a searchable list of opportunities
- Responsive UI for mobile and desktop
- Accessible design with keyboard navigation and ARIA labels

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/opportunity-radar.git
   cd opportunity-radar
   ```

2. **Copy the environment template**
   ```bash
   cp .env.example .env
   ```

3. **Install dependencies** (root script will handle both packages)
   ```bash
   npm install
   ```

4. **Start the development environment**
   ```bash
   npm run dev
   ```
   This launches the backend API (`http://localhost:4000`) and the frontend extension dev server.

5. **Build for production** (optional)
   ```bash
   npm run build
   ```

## Usage

- Open the extension in your browser; the popup will load the **HomePage** showing a hero section, feature highlights, and a **FilterBar** to search opportunities.
- Use the **Workspace** view to browse, filter, and click opportunities; each card opens the linked URL in a new tab.
- Real‑time alerts appear as browser notifications (if enabled) or in‑app toast messages.

### Example: Starting only the backend
```bash
cd backend
npm run dev
```

### Example: Starting only the frontend
```bash
cd frontend
npm run dev
```

The extension will automatically connect to the local backend at the URL defined in `API_BASE_URL`.

---
*Note: No license or contribution boilerplate is included, as per product specifications.*

## Built by

**Irfan N** — [@mynameisirfan93](https://www.instagram.com/mynameisirfan93/)

From **Tekzbyte**

## License

© Irfan N — Tekzbyte. All rights reserved.

You may run and use this project for your own purposes, free of charge.

You may **not** copy, redistribute, modify, rebrand, or resell this code — in whole
or in part, with or without changes — without written permission from the author.

Found a problem or have an idea? Open an issue or message
[@mynameisirfan93](https://www.instagram.com/mynameisirfan93/).
