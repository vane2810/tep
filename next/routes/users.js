const express = require('express');
const router = express.Router();
const { User, Character, Level } = require('../models');


// Llamado para todos los usuarios (sin autenticación)
router.get('/read-users', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'lastname', 'email', 'role'],
    });
    console.log("Usuarios obtenidos:", users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Datos de usuario por id (sin autenticación)
router.get('/:id', async (req, res) => {
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

// Editar datos de usuario por id (sin autenticación)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, lastname, email, role, levelId, characterId } = req.body;

  try {
    console.log('Datos recibidos para actualizar:', { name, lastname, email, role, levelId, characterId });

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    console.log('Datos actuales del usuario:', user.toJSON());

    await user.update({ name, lastname, email, role, levelId, characterId });

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

// Eliminar un usuario del sistema (sin autenticación)
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

// Ruta para validar el ID antes de obtener los datos del usuario
router.get('/validate-id/:id', async (req, res) => {
  const { id } = req.params;

  // Verificar si el id es un número o un UUID (dependiendo de cómo manejes los IDs en tu base de datos)
  if (!isValidId(id)) {
    return res.status(400).json({ error: 'El ID proporcionado no es válido' });
  }

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


module.exports = router;
