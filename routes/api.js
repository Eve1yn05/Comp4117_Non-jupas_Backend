const express = require('express');
const router = express.Router();
const Application = require('../api/schema/applicationSchema');

// API endpoint for login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Validation
  if (!email || !password) {
    return res.status(400).json({ 
      success: false,
      error: 'Email and password required' 
    });
  }
  
  console.log('Login API called:', email);
  
  // TODO: Query database and verify credentials
  // Example: const user = await User.findOne({ email });
  
  // For now, accept any login (replace with real auth)
  res.json({ 
    success: true,
    message: 'Login successful',
    user: {
      email: email,
      id: '12345' // placeholder
    }
  });
});

// API endpoint for signup
router.post('/signup', (req, res) => {
  const { email, password, confirmPassword } = req.body;
  
  // Validation
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
  
  console.log('Signup API called:', email);
  
  // TODO: Hash password and save to database
  // Example: const user = new User({ email, password: hashedPassword });
  // Example: await user.save();
  
  res.json({ 
    success: true,
    message: 'Signup successful',
    user: {
      email: email,
      id: '12345' // placeholder
    }
  });
});

// API endpoint to get current user
router.get('/user', (req, res) => {
  // TODO: Get user from session/JWT token
  res.json({ 
    success: true,
    user: {
      email: 'user@example.com',
      id: '12345'
    }
  });
});

// API endpoint for logout
router.post('/logout', (req, res) => {
  // TODO: Destroy session/token
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
