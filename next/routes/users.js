// Rutas para mostrar datos del usuario | Panel del Admin, Conf. Cuenta
const express = require('express');
const router = express.Router();
const { User, Character, Level } = require('../models');
const jwt = require('jsonwebtoken');

// Creación de usuario | Admin
router.post('/', async (req, res) => {
  const { name, email, password, role, characterId, levelId } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya está en uso' });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      role,
      characterId,
      levelId,
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// LLamado para todos los usuario
router.get('/read-users', async (req, res) => {
  try {
    const users = await User.findAll();
    console.log("Usuarios obtenidos:", users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Datos de usuario por id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      include: [
        { model: Character, as: 'character' },
        { model: Level, as: 'level' },
      ]
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});

// Editar datos de usuario por id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, role, levelId, characterId } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await user.update({ name, email, role, levelId, characterId });

    const updatedUser = await User.findByPk(id, {
      include: [
        { model: Character, as: 'character' },
        { model: Level, as: 'level' },
      ]
    });

    res.status(200).json({ message: 'Usuario actualizado exitosamente', user: updatedUser });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});

// Eliminar un usuario del sistema
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await user.destroy();
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
});


const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extrae el token de los encabezados
  if (!token) {
    return res.status(403).json({ error: 'No se proporcionó un token de autenticación' });
  }

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    req.userId = decoded.id; // Extrae el id del usuario del token y lo guarda en el objeto de la solicitud
    next();
  });
};

// Ruta para obtener los datos del usuario autenticado
router.get('/user', verifyToken, async (req, res) => {
  try {
    // Utilizamos el `req.userId` que se obtuvo en `verifyToken` para buscar al usuario autenticado
    const user = await User.findByPk(req.userId, {
      attributes: ['id', 'name', 'email', 'role'],
      include: [
        { model: Character, as: 'character' },
        { model: Level, as: 'level' },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


module.exports = router;