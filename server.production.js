import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Trust proxy for Railway
app.set('trust proxy', 1);

// CORS per Railway
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Health check per Railway
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes semplificate per demo
app.get('/api/auth/user', (req, res) => {
  res.json({
    id: 'demo-user-123',
    email: 'demo@example.com',
    firstName: 'Demo',
    lastName: 'User',
    profileImageUrl: 'https://via.placeholder.com/150',
    subscription: 'premium'
  });
});

app.get('/api/sessions', (req, res) => {
  res.json([]);
});

app.post('/api/sessions', (req, res) => {
  const session = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  res.json(session);
});

app.get('/api/sessions/:id/bets', (req, res) => {
  res.json([]);
});

app.post('/api/sessions/:id/bets', (req, res) => {
  const bet = {
    id: Date.now(),
    sessionId: parseInt(req.params.id),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  res.json(bet);
});

// Serve static files
const publicPath = path.join(__dirname, 'dist', 'public');
if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath));
  
  // SPA fallback
  app.get('*', (req, res) => {
    const indexPath = path.join(publicPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send('App not built yet');
    }
  });
} else {
  // Fallback se dist non esiste
  app.get('*', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Money Management Pro</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          .container { max-width: 600px; margin: 0 auto; }
          .btn { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Money Management Pro</h1>
          <p>Advanced betting bankroll management application</p>
          <p>Server is running successfully on Railway!</p>
          <button class="btn" onclick="window.location.reload()">Refresh</button>
        </div>
      </body>
      </html>
    `);
  });
}

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Public path: ${publicPath}`);
  console.log(`Public exists: ${fs.existsSync(publicPath)}`);
});