// Server Express ottimizzato per Render
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

const distPath = path.join(__dirname, 'dist', 'public');
if (fs.existsSync(distPath)) {
  console.log('Serving static files from:', distPath);
  app.use(express.static(distPath));
  // SPA fallback: tutte le rotte non-API e non /health restituiscono index.html
  app.get('/*', (req, res) => {
    if (req.path.startsWith('/api/') || req.path === '/health') {
      res.status(404).json({ error: 'API endpoint not found' });
    } else {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
} else {
  console.log('Dist folder not found, serving API only');
  app.get('/*', (req, res) => {
    if (req.path.startsWith('/api/')) {
      res.status(404).json({ error: 'API endpoint not found' });
    } else {
      res.json({
        error: 'Frontend not built',
        message: 'This is API-only mode. Frontend needs to be built.',
        available_endpoints: ['/health', '/api/auth/user', '/api/sessions']
      });
    }
  });
}

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
    platform: 'render'
  });
});

// Middleware
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Money Management Pro'
  });
});

// API Routes
app.get('/api/auth/user', (req, res) => {
  res.json({
    id: 'demo-user-123',
    email: 'demo@example.com',
    firstName: 'Demo',
    lastName: 'User',
    subscription: 'premium'
  });
});

app.get('/api/sessions', (req, res) => {
  res.json([]);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Money Management Pro server running on port ${PORT}`);
});