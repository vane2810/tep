const express = require('express');
const router = express.Router();
const { Report } = require('../models');

// Ruta para crear un reporte
router.post('/', async (req, res) => {
  const { name, title, description, status, type } = req.body;

  try {
    // Verificamos si se proporciona el nombre, título y la descripción
    if (!name || !type || !title || !description) {
      return res.status(400).json({ message: 'El nombre, título, tipo y la descripción son obligatorios.' });
    }

    // Creamos el reporte
    const newReport = await Report.create({
      name,
      title,
      type: type || 'problema',
      description,
      status: status || 'pendiente',

    });

    res.status(201).json({
      message: 'Reporte creado con éxito',
      data: newReport,
    });
  } catch (error) {
    console.error('Error al crear el reporte:', error);
    res.status(500).json({ message: 'Hubo un error al crear el reporte', error });
  }
});

// Obtener reportes
router.get('/', async (req, res) => {
  try {
    const reports = await Report.findAll({
      attributes: ['id', 'name', 'type', 'title', 'description', 'status'],
    });
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error al obtener reportes:", error);
    res.status(500).json({ error: 'Error al obtener reportes' });
  }
});


//Editar estado
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Verificamos si el reporte existe
    const reporte = await Report.findByPk(id);
    if (!reporte) {
      return res.status(404).json({ message: 'Reporte no encontrado' });
    }

    // Actualizamos el estado del reporte
    reporte.status = status;
    await reporte.save();

    res.status(200).json({
      message: 'Estado del reporte actualizado con éxito. Recargar la página',
      data: reporte,
    });
  } catch (error) {
    console.error('Error al actualizar el estado del reporte:', error);
    res.status(500).json({ message: 'Hubo un error al actualizar el estado del reporte', error });
  }
});


module.exports = router;
