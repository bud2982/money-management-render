// Server Express ottimizzato per Render
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static('dist/public'));

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

// Serve main HTML with full interface
app.get('*', (req, res) => {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Money Management Pro - Advanced Betting System</title>
    <meta name="description" content="Professional betting bankroll management with advanced strategies like Kelly Criterion, D'Alembert, and Masaniello systems.">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #333; line-height: 1.6; min-height: 100vh; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 40px; background: rgba(255,255,255,0.95); padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); }
        .header h1 { font-size: 3rem; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 10px; }
        .subtitle { color: #666; font-size: 1.2rem; }
        .status { background: rgba(76, 175, 80, 0.1); color: #4CAF50; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center; font-weight: bold; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 25px; margin-bottom: 40px; }
        .card { background: rgba(255,255,255,0.95); padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border: 1px solid rgba(255,255,255,0.2); backdrop-filter: blur(10px); transition: transform 0.3s ease; }
        .card:hover { transform: translateY(-5px); }
        .card h3 { color: #333; margin-bottom: 20px; font-size: 1.4rem; display: flex; align-items: center; }
        .card h3::before { content: "🎯"; margin-right: 10px; font-size: 1.2em; }
        .card:nth-child(2) h3::before { content: "📊"; }
        .card:nth-child(3) h3::before { content: "📈"; }
        .btn { background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; padding: 15px 25px; border-radius: 8px; cursor: pointer; font-size: 16px; transition: all 0.3s; box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3); }
        .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4); }
        .btn-success { background: linear-gradient(135deg, #4CAF50, #45a049); box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3); }
        .select { width: 100%; padding: 15px; border: 2px solid #e1e5e9; border-radius: 8px; font-size: 16px; background: white; }
        .select:focus { border-color: #667eea; outline: none; }
        .features { background: rgba(255,255,255,0.1); color: white; padding: 50px 40px; border-radius: 15px; text-align: center; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); }
        .features h2 { margin-bottom: 30px; font-size: 2.5rem; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin-top: 30px; }
        .feature { padding: 25px; background: rgba(255,255,255,0.1); border-radius: 10px; backdrop-filter: blur(5px); }
        .feature h4 { margin-bottom: 15px; font-size: 1.3rem; }
        .metric { font-size: 1.1rem; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; }
        .metric strong { color: #667eea; }
        .badge { background: linear-gradient(135deg, #4CAF50, #45a049); color: white; padding: 5px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: bold; }
        .loading { display: none; }
        .error { background: #f8d7da; color: #721c24; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .success { background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; margin: 20px 0; }
        @media (max-width: 768px) { .grid { grid-template-columns: 1fr; } .header h1 { font-size: 2rem; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Money Management Pro</h1>
            <p class="subtitle">Advanced Betting Bankroll Management System</p>
            <div class="status">🟢 System Online - Server Operational</div>
        </div>

        <div id="app-content">
            <div class="grid">
                <div class="card">
                    <h3>Strategy Selection</h3>
                    <select class="select" id="strategy">
                        <option value="percentage">Percentage Strategy</option>
                        <option value="dalembert">D'Alembert System</option>
                        <option value="kelly">Kelly Criterion</option>
                        <option value="masaniello">Masaniello Method</option>
                        <option value="beat-delay">Beat the Delay (AI Enhanced)</option>
                    </select>
                    <button class="btn" onclick="configureStrategy()" style="margin-top: 20px; width: 100%;">Configure Strategy</button>
                </div>

                <div class="card">
                    <h3>Current Session</h3>
                    <div class="metric"><strong>Strategy:</strong> <span id="current-strategy">Percentage <span class="badge">ACTIVE</span></span></div>
                    <div class="metric"><strong>Bankroll:</strong> <span id="bankroll">€1,000.00</span></div>
                    <div class="metric"><strong>Bets:</strong> <span id="bet-count">0</span></div>
                    <div class="metric"><strong>Win Rate:</strong> <span id="win-rate">0%</span></div>
                    <button class="btn btn-success" onclick="startSession()" style="width: 100%; margin-top: 20px;">Start New Session</button>
                </div>

                <div class="card">
                    <h3>Performance</h3>
                    <div class="metric"><strong>Total Sessions:</strong> <span id="total-sessions">0</span></div>
                    <div class="metric"><strong>ROI:</strong> <span id="roi">0%</span></div>
                    <div class="metric"><strong>Max Drawdown:</strong> <span id="max-drawdown">0%</span></div>
                    <div class="metric"><strong>Status:</strong> <span style="color: #4CAF50;">Ready to Trade</span></div>
                    <button class="btn" onclick="viewAnalytics()" style="width: 100%; margin-top: 20px;">View Analytics</button>
                </div>
            </div>

            <div class="features">
                <h2>Premium Features Available</h2>
                <div class="features-grid">
                    <div class="feature">
                        <h4>🧮 Advanced Strategies</h4>
                        <p>Kelly Criterion, D'Alembert, Masaniello, Beat the Delay with machine learning predictions</p>
                    </div>
                    <div class="feature">
                        <h4>📊 Real-time Analytics</h4>
                        <p>Live performance tracking, detailed statistics, trend analysis and risk metrics</p>
                    </div>
                    <div class="feature">
                        <h4>🔄 Multi-device Sync</h4>
                        <p>Access your data from any device with secure cloud synchronization</p>
                    </div>
                    <div class="feature">
                        <h4>🛡️ Professional Tools</h4>
                        <p>Bankroll optimization, automated risk management, and intelligent alerts</p>
                    </div>
                </div>
            </div>

            <div class="card" style="text-align: center; margin-top: 40px;">
                <h3 style="color: #4CAF50; margin-bottom: 15px;">🔧 System Test</h3>
                <button class="btn" onclick="testHealthCheck()">Test Health Check</button>
                <button class="btn" onclick="testAPI()" style="margin-left: 10px;">Test API</button>
                <div id="test-results" style="margin-top: 20px;"></div>
            </div>
        </div>
    </div>

    <script>
        // App functionality
        function configureStrategy() {
            const strategy = document.getElementById('strategy').value;
            showSuccess('Strategy configured: ' + strategy);
        }

        function startSession() {
            showSuccess('New session started successfully!');
            document.getElementById('bet-count').textContent = '1';
            document.getElementById('win-rate').textContent = '100%';
        }

        function viewAnalytics() {
            showSuccess('Analytics view activated');
        }

        async function testHealthCheck() {
            try {
                showLoading('Testing health check...');
                const response = await fetch('/health');
                const data = await response.json();
                showSuccess('Health Check: ' + JSON.stringify(data, null, 2));
            } catch (error) {
                showError('Health check failed: ' + error.message);
            }
        }

        async function testAPI() {
            try {
                showLoading('Testing API...');
                const response = await fetch('/api/auth/user');
                const data = await response.json();
                showSuccess('API Test: ' + JSON.stringify(data, null, 2));
            } catch (error) {
                showError('API test failed: ' + error.message);
            }
        }

        function showSuccess(message) {
            document.getElementById('test-results').innerHTML = 
                '<div class="success">' + message + '</div>';
        }

        function showError(message) {
            document.getElementById('test-results').innerHTML = 
                '<div class="error">' + message + '</div>';
        }

        function showLoading(message) {
            document.getElementById('test-results').innerHTML = 
                '<div class="status">' + message + '</div>';
        }

        // Interactive strategy selection
        document.getElementById('strategy').addEventListener('change', function() {
            const strategies = {
                'percentage': 'Fixed percentage of bankroll',
                'dalembert': 'Progressive betting system',
                'kelly': 'Probability-based optimal sizing',
                'masaniello': 'Multi-event structured system',
                'beat-delay': 'AI-enhanced predictive strategy'
            };
            document.getElementById('current-strategy').innerHTML = 
                this.options[this.selectedIndex].text + ' <span class="badge">SELECTED</span>';
        });

        // Button animations
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });

        // Initialize app
        console.log('Money Management Pro - Initialized');
        console.log('Server Status: Online');
        console.log('Features: Ready');
    </script>
</body>
</html>`;

  res.send(html);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(\`Money Management Pro server running on port \${PORT}\`);
});