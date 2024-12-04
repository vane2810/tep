const express = require('express');
const router = express.Router();
const { User, Character } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const { name, lastname, email, password, confirmPassword } = req.body;

  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
  };

  const validateLastname = (lastname) => {
    const regex = /^[a-zA-Z\s]*$/; // Permitir vacío porque es opcional
    return regex.test(lastname);
  };

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  if (!validateName(name)) {
    return res.status(400).json({ error: 'El nombre solo puede contener letras.' });
  }
  if (lastname && !validateLastname(lastname)) {
    return res.status(400).json({ error: 'El apellido solo puede contener letras' });
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
      lastname,
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
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'El correo electrónico no está registrado' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'El correo electrónico o la contraseña son incorrectos.' });
    }

    const token = jwt.sign(
      { id: user.id,  name: user.name, email: user.email, role: user.role, nivel: user.levelId, characterId: user.characterId }, 
      'your_jwt_secret',
      { expiresIn: '5h' }
    );

    res.status(200).json({ 
      message: 'Inicio de sesión exitoso', 
      token, 
      id: user.id,
      email:user.email,
      role: user.role, 
      nivel: user.levelId, 
      characterId: user.characterId,
      name: user.name,
    });
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al cerrar sesión' });
    } else {
      res.status(200).json({ message: 'Sesión cerrada exitosamente.' });
    }
  });
});

module.exports = router;