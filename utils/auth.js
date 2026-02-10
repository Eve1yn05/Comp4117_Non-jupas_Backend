const express = require('express');
const router = express.Router();

// GET login page
router.get('/login', (req, res) => {
  res.render('login');
});

// POST login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // TODO: Add database validation here
  console.log('Login attempt:', { email, password });
  
  // Placeholder - replace with actual authentication
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  
  res.json({ message: 'Login successful', email });
});

// GET signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// POST signup
router.post('/signup', (req, res) => {
  const { email, password, confirmPassword } = req.body;
  
  // TODO: Add database insertion here
  console.log('Signup attempt:', { email, password });
  
  // Validation
  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields required' });
  }
  
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }
  
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }
  
  res.json({ message: 'Signup successful', email });
});

module.exports = router;
