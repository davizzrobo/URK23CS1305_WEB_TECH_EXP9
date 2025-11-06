const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { full_name, email, username, password, confirm_password } = req.body;

    // Validation
    if (!full_name || !email || !username || !password || !confirm_password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      });
    }

    // Check if passwords match
    if (password !== confirm_password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Passwords do not match' 
      });
    }

    // Password strength validation
    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 6 characters long' 
      });
    }

    // Check if user already exists
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already registered' 
      });
    }

    const existingUsername = await User.findOne({ username: username.toLowerCase() });
    if (existingUsername) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username already taken' 
      });
    }

    // Create new user
    const user = new User({
      full_name,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      token,
      user: {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        username: user.username
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false, 
        message: messages[0] 
      });
    }

    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration' 
    });
  }
});

// @route   POST /api/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be email or username

    // Validation
    if (!identifier || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide username/email and password' 
      });
    }

    // Find user by email or username
    const user = await User.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { username: identifier.toLowerCase() }
      ]
    });

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        username: user.username
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
});

// @route   GET /api/user/:id
// @desc    Get user details by ID
// @access  Private
router.get('/user/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// @route   GET /api/verify
// @desc    Verify JWT token
// @access  Private
router.get('/verify', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Verify error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

module.exports = router;
