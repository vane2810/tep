// Rutas para mostrar datos del usuario | Panel del Admin, Conf. Cuenta
const express = require('express');
const router = express.Router();
const { User, Character, Level } = require('../models');
const jwt = require('jsonwebtoken');

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extrae el token de los encabezados
  if (!token) {
    return res.status(403).json({ error: 'No se proporcionó un token de autenticación' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    req.userId = decoded.id; // Extrae el id del usuario del token y lo guarda en el objeto de la solicitud
    req.userRole = decoded.role; // Extrae el rol del usuario del token y lo guarda en el objeto de la solicitud
    next();
  });
};

// Middleware para verificar si el usuario es administrador
const verifyAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Se requiere rol de administrador.' });
  }
  next();
};

// Creación de usuario | Solo Admin
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  const { name, lastname, email, password, role, characterId, levelId } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya está en uso' });
    }

    const newUser = await User.create({
      name,
      lastname,
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

// Llamado para todos los usuarios (solo Admin)
router.get('/read-users', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role'],
    });
    console.log("Usuarios obtenidos:", users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Datos de usuario por id (solo Admin)
router.get('/:id', verifyToken, verifyAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }, // Excluye la contraseña
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

// Editar datos de usuario por id (solo Admin)
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, lastname, email, role, levelId, characterId } = req.body;

  try {
    // Muestra los datos recibidos
    console.log('Datos recibidos para actualizar:', { name, lastname, email, role, levelId, characterId });

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Muestra los datos actuales del usuario antes de la actualización
    console.log('Datos actuales del usuario:', user.toJSON());

    // Actualiza el usuario con los nuevos valores
    await user.update({ name, lastname, email, role, levelId, characterId });

    // Obtén y muestra los datos del usuario después de la actualización
    const updatedUser = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [
        { model: Character, as: 'character' },
        { model: Level, as: 'level' },
      ]
    });

    console.log('Datos del usuario después de actualizar:', updatedUser.toJSON());

    res.status(200).json({ message: 'Usuario actualizado exitosamente', user: updatedUser });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});


// Eliminar un usuario del sistema (solo Admin)
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
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

// Ruta para obtener los datos del usuario autenticado (cualquier usuario autenticado)
router.get('/user', verifyToken, async (req, res) => {
  try {
    // Utilizamos el `req.userId` que se obtuvo en `verifyToken` para buscar al usuario autenticado
    const user = await User.findByPk(req.userId, {
      attributes: ['id', 'name', 'lastname', 'email', 'role'],
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
