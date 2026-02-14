const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDB } = require('./db');
const router = express.Router();

// GET login page
router.get('/login', (req, res) => {
  res.render('login');
});

// POST login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    
    const db = getDB();
    const user = await db.collection('students').findOne({ 'personal.email': email });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user._id, email: user.personal.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    res.json({ message: 'Login successful', email, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// POST signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields required' });
    }
    
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }
    
    const db = getDB();
    const existingUser = await db.collection('students').findOne({ 'personal.email': email });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = {
      personal: { email, name: '' },
      password: hashedPassword,
      application: { status: 'Pending', applied_at: new Date() }
    };
    
    const result = await db.collection('students').insertOne(newUser);
    
    const token = jwt.sign(
      { id: result.insertedId, email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    res.json({ message: 'Signup successful', email, token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
