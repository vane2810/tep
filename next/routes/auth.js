// Rutas de autenticación

const express = require('express');
const router = express.Router();
const { User, Role } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Ruta registro
router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword, roleId } = req.body;

  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
  };

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  if (!validateName(name)) {
    return res.status(400).json({ error: 'El nombre solo puede contener letras.' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Las contraseñas no coinciden' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      roleId: roleId || 1, 
    });


    res.status(201).json({ message: 'Usuario registrado correctamente', user});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email }, include: Role });
    if (!user) {
      return res.status(400).json({ error: 'El correo electrónico no está registrado' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'El correo electrónico o la contraseña son incorrectos.' });
    }

    const token = jwt.sign({ id: user.id, role: user.Role.name }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token, role: user.Role.name });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


// Ruta cerrar sesión
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al cerrar sesión' });
    } else {
      // Devolver una respuesta exitosa
      res.status(200).json({ message: 'Sesión cerrada exitosamente.' });
    }
  });
});



module.exports = router;