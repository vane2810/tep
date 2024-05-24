// routes/auth.js
const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

// Ruta de registro de usuario
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verificar si el correo electrónico ya está registrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }

    // Si el correo electrónico no está registrado, crea un nuevo usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'Usuario registrado correctamente', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Verificar si el usuario existe en la base de datos
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: 'El correo electrónico o la contraseña son incorrectos.' });
      }
  
      // Verificar si la contraseña es correcta
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ error: 'El correo electrónico o la contraseña son incorrectos.' });
      }
  
      // Aquí podrías generar un token de autenticación y enviarlo como respuesta
      // O simplemente enviar un mensaje de éxito si prefieres manejar la sesión de otra manera
      res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
});

  
  
module.exports = router;
