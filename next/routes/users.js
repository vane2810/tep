// routes/users.js
const express = require('express');
const router = express.Router();
const { User, Character, Level } = require('../models'); // Asegúrate de que estás importando el modelo User correctamente

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  const { name, email, password, role, characterId, levelId } = req.body;

  try {
    // Validar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya está en uso' });
    }

    // Crear un nuevo usuario
    const newUser = await User.create({
      name,
      email,
      password, // Asegúrate de que se guarde de manera segura (hasheado)
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

// Mostrar usuario por roles
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
