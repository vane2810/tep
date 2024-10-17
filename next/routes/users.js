// routes/users.js
const express = require('express');
const router = express.Router();
const { User, Character, Level, Progreso } = require('../models'); // Asegúrate de que estás importando el modelo User correctamente

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ message: 'Usuario creado exitosamente', user });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

router.get('/read-users', async (req, res) => {
  try {
    const users = await User.findAll();
    console.log("Usuarios obtenidos:", users); // Verifica la estructura de los datos obtenidos
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});



// Obtener un solo usuario por ID con datos de character, level 
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id, {
      include: [
        { model: Character, as: 'character' },  // Incluir datos del modelo Character
        { model: Level, as: 'level' },          // Incluir datos del modelo Level
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

// Actualizar un usuario por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, role, levelId, characterId } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar el usuario con los datos proporcionados
    await user.update({ name, email, role, levelId, characterId });

    // Volver a buscar el usuario actualizado e incluir los datos de los modelos relacionados
    const updatedUser = await User.findByPk(id, {
      include: [
        { model: Character, as: 'character' },  // Incluir datos del modelo Character
        { model: Level, as: 'level' },          // Incluir datos del modelo Level
      ]
    });

    res.status(200).json({ message: 'Usuario actualizado exitosamente', user: updatedUser });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});



// Eliminar un usuario por ID
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

module.exports = router;
