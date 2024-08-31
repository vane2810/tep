// Rutas de autenticación

const express = require('express');
const router = express.Router();
const { User, Character, Level } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Ruta registro
router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

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
      role: null,
    });

    res.status(201).json({ message: 'Usuario registrado correctamente', userId: user.id });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar el rol
router.post('/role', async (req, res) => {
  const { userId, role } = req.body;

  try {
    const user = await User.findByPk(userId);
    user.role = role;
    await user.save();

    res.status(200).json({ message: 'Rol asignado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar el nivel
router.post('/level', async (req, res) => {
  const { userId, levelId } = req.body;

  try {
    const user = await User.findByPk(userId);
    user.levelId = levelId;
    await user.save();

    res.status(200).json({ message: 'Nivel asignado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta para actualizar el personaje
router.post('/character', async (req, res) => {
  const { userId, characterId } = req.body;

  try {
    const user = await User.findByPk(userId);
    user.characterId = characterId;
    await user.save();

    res.status(200).json({ message: 'Personaje asignado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Encuentra al usuario por su correo electrónico
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'El correo electrónico no está registrado' });
    }

    // Compara la contraseña proporcionada con la almacenada en la base de datos
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'El correo electrónico o la contraseña son incorrectos.' });
    }

    // Genera un token JWT que incluye el characterId
    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role, nivel: user.levelId, characterId: user.characterId, characterName: user.Character.name }, // Incluye el characterId aquí
      'your_jwt_secret',
      { expiresIn: '1h' }
    );

    // Responde con el token y la información adicional necesaria
    res.status(200).json({ 
      message: 'Inicio de sesión exitoso', 
      token, 
      role: user.role, 
      nivel: user.levelId, 
      characterId: user.characterId,
      name: user.name,
      characterName: user.Character.name,
    });
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error);
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