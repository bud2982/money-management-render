import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { createServer } from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = createServer(app);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Trust proxy for Railway/Render
app.set('trust proxy', 1);

// CORS configuration
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    'https://money-management-pro.onrender.com',
    'https://money-management-pro.railway.app',
    'https://money-management-pro.up.railway.app',
    process.env.RENDER_EXTERNAL_URL,
    process.env.RAILWAY_STATIC_URL,
    process.env.RAILWAY_PUBLIC_DOMAIN
  ].filter(Boolean);

  if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
    res.header('Access-Control-Allow-Origin', origin || '*');
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    version: '2.0.0-updated'
  });
});

// API Routes - Enhanced for production
app.get('/api/auth/user', (req, res) => {
  res.json({
    id: 'premium-user-123',
    email: 'premium@example.com',
    firstName: 'Premium',
    lastName: 'User',
    profileImageUrl: 'https://via.placeholder.com/150',
    subscription: 'premium',
    subscriptionActive: true,
    subscriptionExpires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
  });
});

// Sessions storage - in-memory for demo
let sessions = [];
let nextSessionId = 1;

app.get('/api/sessions', (req, res) => {
  res.json(sessions);
});

app.post('/api/sessions', (req, res) => {
  const newSession = {
    id: nextSessionId++,
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  sessions.push(newSession);
  res.status(201).json(newSession);
});

app.get('/api/sessions/:id', (req, res) => {
  const session = sessions.find(s => s.id === parseInt(req.params.id));
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  res.json(session);
});

app.put('/api/sessions/:id', (req, res) => {
  const sessionIndex = sessions.findIndex(s => s.id === parseInt(req.params.id));
  if (sessionIndex === -1) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  sessions[sessionIndex] = {
    ...sessions[sessionIndex],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  res.json(sessions[sessionIndex]);
});

app.delete('/api/sessions/:id', (req, res) => {
  const sessionIndex = sessions.findIndex(s => s.id === parseInt(req.params.id));
  if (sessionIndex === -1) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  sessions.splice(sessionIndex, 1);
  res.status(204).send();
});

// Bets storage - in-memory for demo
let bets = [];
let nextBetId = 1;

app.get('/api/sessions/:id/bets', (req, res) => {
  const sessionBets = bets.filter(bet => bet.sessionId === parseInt(req.params.id));
  res.json(sessionBets);
});

app.post('/api/sessions/:id/bets', (req, res) => {
  const newBet = {
    id: nextBetId++,
    sessionId: parseInt(req.params.id),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  bets.push(newBet);
  res.status(201).json(newBet);
});

// Serve static files
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  
  // SPA fallback - serve index.html for all non-API routes
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api/')) {
      res.sendFile(path.join(distPath, 'index.html'));
    } else {
      res.status(404).json({ error: 'API endpoint not found' });
    }
  });
} else {
  app.get('*', (req, res) => {
    res.status(503).json({ 
      error: 'Application not built',
      message: 'Run npm run build to create the dist folder'
    });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
});

export default app;