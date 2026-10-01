const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(helmet());
app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000'], credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(morgan('dev'));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/chapters', require('./routes/chapterRoutes'));
app.use('/api/practice', require('./routes/practiceRoutes'));

// Proxy to Python calculators
app.post('/api/calc/:tool', async (req, res) => {
  try {
    const url = process.env.PYTHON_SERVICE_URL || 'http://localhost:8002';
    const response = await fetch(`${url}/calc/${req.params.tool}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(503).json({ success: false, message: 'Python calculator service unavailable. Start it on port 8002.' });
  }
});

app.get('/', (req, res) => res.json({ success: true, message: 'Accounting Learning API running' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
