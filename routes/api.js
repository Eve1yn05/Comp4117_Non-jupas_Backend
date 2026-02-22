const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDB } = require('../utils/db');
const router = express.Router();
const Application = require('../api/schema/applicationSchema');

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
    const user = await db.collection('users').findOne({ email });
    
    if (!user || !user.password) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    res.json({ 
      success: true,
      message: 'Login successful',
      token,
      user: { email: user.email, id: user._id.toString() }
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
    
    if (!db) {
      console.error('Database connection is null');
      return res.status(500).json({ success: false, error: 'Database connection failed' });
    }
    
    const existingUser = await db.collection('users').findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'Email already registered' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user in users collection
    console.log('Creating user document...');
    const userResult = await db.collection('users').insertOne({
      email,
      password: hashedPassword,
      created_at: new Date()
    });
    console.log('User created with ID:', userResult.insertedId);
    
    // Create student profile in students collection
    console.log('Creating student document...');
    const studentResult = await db.collection('students').insertOne({
      personal: { email, name: '' },
      application: { category: 'Non-JUPAS', status: 'Pending', applied_at: new Date() },
      academic: {},
      test_scores: {},
      records: {},
      evaluation: {}
    });
    console.log('Student created with ID:', studentResult.insertedId);
    
    const token = jwt.sign(
      { id: userResult.insertedId, email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    res.json({ 
      success: true,
      message: 'Signup successful',
      token,
      user: { email, id: userResult.insertedId.toString() }
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
    const student = await db.collection('students').findOne({ 'personal.email': req.user.email });
    
    if (!student) {
      return res.status(404).json({ success: false, error: 'Student profile not found' });
    }
    
    res.json({ 
      success: true,
      user: {
        email: req.user.email,
        id: req.user.id,
        name: student.personal.name || ''
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

// GET all applications
router.get('/applications', async (req, res) => {
  try {
    const applications = await Application.find();
    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET single application by ID
router.get('/applications/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Application not found'
      });
    }
    res.json({
      success: true,
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// UPDATE application status
router.put('/applications/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status'
      });
    }
    
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!application) {
      return res.status(404).json({
        success: false,
        error: 'Application not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Status updated successfully',
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
