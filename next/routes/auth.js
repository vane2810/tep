// routes/auth.js
const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

// Ruta de registro de usuario
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
