import express from 'express';
import path from 'path';
import fs from 'fs';
import { apiRouter } from './server/api.ts';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRouter);

// Serve static frontend files if built
const distDir = path.resolve(process.cwd(), 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));

  // SPA fallback
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(distDir, 'index.html'));
  });
} else {
  // If not built yet, guide message
  app.get('/', (req, res) => {
    res.send('Tirthobondhu Tour & Travels API Server is running on port 3000. Build client with npm run build.');
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Tirthobondhu server listening on http://0.0.0.0:${PORT}`);
});
