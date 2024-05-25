// Rutas de autenticación

const express = require('express');
const router = express.Router();
const { User,Role } = require('../models');
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
    // Crear el usuario y asignar automáticamente el rol de estudiante (id 1)
    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword,
      roleId: 1,
    });
    res.status(201).json({ message: 'Usuario registrado correctamente', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

    
 
// Ruta de inicio de sesión
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

    // Asignamos el rol de estudiante al usuario
    try {
    await assignRole(user.id, 'estudiante');
    } catch (error) {
    res.status(500).json({ error: 'Error al asignar el rol de estudiante' });
    }


    // Mensaje de confirmación
    res.status(200).json({ message: 'Inicio de sesión exitoso', user });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta de cierre de sesión
router.get('/logout',(req, res) => {
  
  res.status(200).json({ message: 'Sesión cerrada exitosamente.' });
});

module.exports = router;