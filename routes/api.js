const express = require('express');
const router = express.Router();

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

module.exports = router;
