import express from 'express';
import { createServer } from 'http';
import routes from './routes/opportunity';
import { PrismaClient } from '@prisma/client';
import { startScraper } from './services/scraper';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.use('/api/opportunities', routes);

const server = createServer(app);
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

server.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
  startScraper().catch((err) => console.error('Scraper start error:', err));
});

export default server;