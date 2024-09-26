const express = require('express');
const router = express.Router();
const { Progreso } = require('../models');  // Cambia Progress por Progreso

// Ruta para guardar el progreso
router.post('/guardar-progreso', async (req, res) => {
    const { userId, nivel, puntaje } = req.body;

    try {
        console.log("Datos recibidos en el backend:", { userId, nivel, puntaje });

        // Verifica si el progreso ya existe
        let progreso = await Progreso.findOne({ where: { user_id: userId, nivel: nivel } });

        if (!progreso) {
            // Si no existe, crea un nuevo registro de progreso
            progreso = await Progreso.create({
                user_id: userId,
                nivel: nivel,
                puntaje: puntaje !== null && puntaje !== undefined ? puntaje : 0  // Asigna un valor por defecto para el puntaje
            });
        } else {
            return res.status(200).json({ message: 'El progreso ya existe' });
        }

        res.status(200).json({ message: 'Progreso guardado correctamente' });
    } catch (error) {
        console.error("Error guardando el progreso:", error);
        res.status(500).json({ message: 'Error guardando el progreso' });
    }
});



// Ruta para obtener el progreso de un usuario
router.get('/cargar-progreso/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const progreso = await Progreso.findAll({
      where: { usuario_id: userId },
      attributes: ['nivel', 'puntaje']
    });

    const nivelesDesbloqueados = progreso.map(p => p.nivel);

    res.status(200).json({ nivelesDesbloqueados });
  } catch (error) {
    console.error('Error al cargar el progreso:', error);
    res.status(500).json({ error: 'Error al cargar el progreso' });
  }
});



module.exports = router;
