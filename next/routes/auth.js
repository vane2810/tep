// Rutas de autenticación

const express = require('express');
const router = express.Router();
const { User,Role } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Log para verificar los datos recibidos
  console.log('Datos recibidos:', req.body);

  // Expresión regular para validar el formato del correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Verificar si todos los campos están presentes y en el formato correcto
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'El formato del correo electrónico es inválido' });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Las contraseñas no coinciden' });
  }

  try {
    // Verificar si el correo electrónico ya está registrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }

    // Si el correo electrónico no está registrado, crea un nuevo usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      roleId: 1, // Asignar el ID del rol directamente
    });

    console.log('Usuario creado:', user); // Log del usuario creado
    res.status(201).json({ message: 'Usuario registrado correctamente', user });
  } catch (error) {
    console.error('Error en el registro:', error); // Log de error
    res.status(500).json({ error: error.message });
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

    // Generar token de acceso
    const token = jwt.sign({ id: user.id, roleId: user.roleId }, 'your_jwt_secret', { expiresIn: 86400 });

    // Almacenar el ID de rol del usuario en localStorage
    localStorage.setItem('roleId', user.roleId);
    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para cerrar sesión
router.post('/logout', (req, res) => { // Cambié GET a POST para mayor seguridad
  // Eliminar la sesión del usuario
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al cerrar sesión' });
    } else {
      // Eliminar la cookie de sesión
      res.clearCookie('session_id');
      res.status(200).json({ message: 'Sesión cerrada exitosamente.' });
    }
  });
});

module.exports = router;