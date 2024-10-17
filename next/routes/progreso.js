const express = require('express');
const router = express.Router();
const { Progreso } = require('../models');

router.post('/guardar-progreso', async (req, res) => {
  const { userId, nivel, puntaje, materia } = req.body;

  try {
    let progreso = await Progreso.findOne({ where: { user_id: userId, nivel: nivel, materia } });

    if (!progreso) {
      progreso = await Progreso.create({
        user_id: userId,
        nivel: nivel,
        puntaje: puntaje,
        materia: materia
      });
    }

    res.status(200).json({ message: 'Progreso guardado correctamente' });
  } catch (error) {
    console.error("Error guardando el progreso:", error);
    res.status(500).json({ message: 'Error guardando el progreso' });
  }
});


router.get('/obtener-progreso/:userId/:materia', async (req, res) => {
  const { userId, materia } = req.params; 
  console.log('Obteniendo progreso para el userId:', userId, 'y la materia:', materia);

  try {
    const progreso = await Progreso.findAll({ where: { user_id: userId, materia: materia } });
    console.log('Progreso encontrado:', progreso);

    if (progreso.length > 0) {
      res.status(200).json(progreso);
    } else {
      res.status(404).json({ message: 'No se encontró progreso para este usuario y materia.' });
    }
  } catch (error) {
    console.error('Error al obtener el progreso:', error);
    res.status(500).json({ message: 'Error al obtener el progreso' });
  }
});




module.exports = router;
