const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDB } = require('../utils/db');
const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ success: false, error: 'Invalid token' });
  }
};

// API endpoint for login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Email and password required' 
      });
    }
    
    const db = getDB();
    const user = await db.collection('students').findOne({ 'personal.email': email });
    
    if (!user || !user.password) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user._id, email: user.personal.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    res.json({ 
      success: true,
      message: 'Login successful',
      token,
      user: { email: user.personal.email, id: user._id.toString() }
    });
  } catch (error) {
    console.error('API login error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// API endpoint for signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ 
        success: false,
        error: 'All fields required' 
      });
    }
    
    if (password !== confirmPassword) {
      return res.status(400).json({ 
        success: false,
        error: 'Passwords do not match' 
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        error: 'Password must be at least 6 characters' 
      });
    }
    
    const db = getDB();
    const existingUser = await db.collection('students').findOne({ 'personal.email': email });
    
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Email already registered' });
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
    
    res.json({ 
      success: true,
      message: 'Signup successful',
      token,
      user: { email, id: result.insertedId.toString() }
    });
  } catch (error) {
    console.error('API signup error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// API endpoint to get current user
router.get('/user', verifyToken, async (req, res) => {
  try {
    const db = getDB();
    const { ObjectId } = require('mongodb');
    const user = await db.collection('students').findOne({ _id: new ObjectId(req.user.id) });
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    res.json({ 
      success: true,
      user: {
        email: user.personal.email,
        id: user._id.toString(),
        name: user.personal.name
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// API endpoint for logout
router.post('/logout', verifyToken, (req, res) => {
  res.json({ 
    success: true,
    message: 'Logout successful'
  });
});

module.exports = router;
