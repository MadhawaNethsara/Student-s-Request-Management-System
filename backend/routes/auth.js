const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../models/users');
const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // console.log("Login attempt:", email);
    if(!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    // Find user by email
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }
    console.log("user found:", user.email);
    // Check password

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(404).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    // const token = jwt.sign(
    //   { id: user._id, role: user.role },
    //   process.env.JWT_SECRET,
    //   { expiresIn: '1d' }
    // );

    // Send response
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
