const express = require('express');
const router = express.Router();
const Application = require('../api/schema/applicationSchema');
const User = require('../api/schema/userSchema');

// GET login page
router.get('/login', (req, res) => {
  res.render('login');
});

// POST login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Find user and explicitly select password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Set session with role
    req.session.userId = user._id;
    req.session.email = user.email;
    req.session.role = user.role;

    // Save session before responding
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ error: 'Session error' });
      }
      res.json({ 
        success: true,
        message: 'Login successful', 
        email: user.email,
        userId: user._id,
        role: user.role
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// GET signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// GET register page (alias for signup)
router.get('/register', (req, res) => {
  res.render('signup');
});

// POST signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password, confirmPassword, userType } = req.body;

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

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Determine role (default to student if not specified)
    const role = userType && ['teacher', 'student', 'admin'].includes(userType) ? userType : 'student';

    // Create new user
    const newUser = new User({
      email: email.toLowerCase(),
      password,
      role
    });

    await newUser.save();

    // Set session with role
    req.session.userId = newUser._id;
    req.session.email = newUser.email;
    req.session.role = newUser.role;

    res.status(201).json({ 
      message: 'Signup successful', 
      email: newUser.email,
      userId: newUser._id,
      role: newUser.role
    });
  } catch (error) {
    console.error('Signup error:', error);
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// POST register (alias for signup)
router.post('/register', async (req, res) => {
  try {
    const { email, password, confirmPassword, userType } = req.body;

    // Validation
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    // Determine role (default to student if not specified)
    const role = userType && ['teacher', 'student', 'admin'].includes(userType) ? userType : 'student';

    // Create new user
    const newUser = new User({
      email: email.toLowerCase(),
      password,
      role
    });

    await newUser.save();

    // Set session
    req.session.userId = newUser._id;
    req.session.email = newUser.email;
    req.session.role = newUser.role;

    // Save session before responding
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ success: false, message: 'Session error' });
      }
      res.status(201).json({ 
        success: true,
        message: 'Signup successful', 
        email: newUser.email,
        userId: newUser._id,
        role: newUser.role
      });
    });
  } catch (error) {
    console.error('Signup error:', error);
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }
    res.status(500).json({ success: false, message: 'Server error during signup' });
  }
});

// Middleware to check if user is authenticated
const checkAuth = (req, res, next) => {
  console.log('checkAuth - Session:', req.session);
  console.log('checkAuth - userId:', req.session?.userId);
  
  if (req.session && req.session.userId) {
    console.log('User authenticated, proceeding...');
    next();
  } else {
    console.log('User not authenticated, redirecting to login');
    res.status(401).json({ error: 'Unauthorized. Please login first.' });
  }
};

// Middleware to check if user is a teacher
const checkTeacherAuth = (req, res, next) => {
  console.log('checkTeacherAuth - Session:', req.session);
  console.log('checkTeacherAuth - userId:', req.session?.userId);
  console.log('checkTeacherAuth - role:', req.session?.role);
  
  if (req.session && req.session.userId && req.session.role === 'teacher') {
    console.log('Teacher authenticated, proceeding...');
    next();
  } else if (req.session && req.session.userId) {
    console.log('User authenticated but not a teacher');
    res.status(403).json({ error: 'Access denied. Teacher role required.' });
  } else {
    console.log('User not authenticated, redirecting to login');
    res.status(401).json({ error: 'Unauthorized. Please login first.' });
  }
};

// GET logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error logging out' });
    }
    res.redirect('/login');
  });
});

// GET review page (protected route - teachers only)
router.get('/review', checkTeacherAuth, async (req, res) => {
  try {
    // Fetch all applications from MongoDB and convert to plain objects
    const applications = await Application.find().lean();
    console.log(`✅ Fetched ${applications.length} applications from database`);
    res.render('review', { applications, user: req.session });
  } catch (error) {
    console.error('❌ Error fetching applications:', error);
    // Return empty array if error
    res.render('review', { applications: [], user: req.session });
  }
});

module.exports = router;
