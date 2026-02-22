const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const connectDB = require('./utils/db');
const authRoutes = require('./utils/auth');
const apiRoutes = require('./routes/api');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    httpOnly: true, 
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: false // Set to true if using HTTPS
  }
}));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
(async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  }
})();

// Routes
app.get('/', (req, res) => {
  res.render('login');
});

app.use('/auth', authRoutes);

// API Routes
app.use('/api/auth', apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
