// ./routes/steps.js
const express = require('express');
const router = express.Router();
const { Step } = require('../models');

// Obtener todos los pasos de un contenido específico
router.get('/byContent/:contentId', async (req, res) => {
  const { contentId } = req.params;
  try {
    const contents = await Step.findAll({ where: { contentId } });
    if (contents) {
      res.status(200).json(contents);
    } else {
      res.status(404).json({ message: 'No se encontraron contenido para el topicId especificado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los contenido', error });
  }
});

// Obtener un contenido específico por ID
router.get('/:id', async (req, res) => {
  try {
      const step = await Step.findByPk(req.params.id);
      if (step) {
          res.status(200).json(step);
      } else {
          res.status(404).json({ message: 'contenido no encontrado' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Error al obtener el contenido', error });
  }
});

// Crear un nuevo paso
router.post('/', async (req, res) => {
  const { title, description, img_url, audio_url, aditional, contentId } = req.body;
  try {
    const newStep = await Step.create({ title, description, img_url, audio_url, aditional, contentId });
    res.status(201).json(newStep);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el paso', error });
  }
});

// Actualizar un paso existente
router.put('/:id', async (req, res) => {
  const { title, description, img_url, audio_url, aditional } = req.body;
  try {
    const step = await Step.findByPk(req.params.id);
    if (step) {
      await step.update({ title, description, img_url, audio_url, aditional });
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