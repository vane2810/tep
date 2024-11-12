// ./routes/steps.js
const express = require('express');
const router = express.Router();
const { Step } = require('../models');

// Obtener todos los pasos de un contenido específico
router.get('/byContent/:contentId', async (req, res) => {
  try {
    const { contentId } = req.params;
    const steps = await Step.findAll({ where: { contentId }, order: [['stepNumber', 'ASC']] });
    res.status(200).json(steps);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los pasos', error });
  }
});

// Crear un nuevo paso
router.post('/', async (req, res) => {
  const { contentId, stepNumber, title, description, img_url, audio_url } = req.body;
  try {
    const newStep = await Step.create({ contentId, stepNumber, title, description, img_url, audio_url });
    res.status(201).json(newStep);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el paso', error });
  }
});

// Actualizar un paso existente
router.put('/:id', async (req, res) => {
  const { stepNumber, title, description, img_url, audio_url } = req.body;
  try {
    const step = await Step.findByPk(req.params.id);
    if (step) {
      await step.update({ stepNumber, title, description, img_url, audio_url });
      res.status(200).json(step);
    } else {
      res.status(404).json({ message: 'Paso no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el paso', error });
  }
});

// Eliminar un paso
router.delete('/:id', async (req, res) => {
  try {
    const step = await Step.findByPk(req.params.id);
    if (step) {
      await step.destroy();
      res.status(200).json({ message: 'Paso eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Paso no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el paso', error });
  }
});

module.exports = router;
