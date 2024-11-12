// ./routes/subtopics.js
const express = require('express');
const router = express.Router();
const { Subtopic } = require('../models'); // Importar el modelo de Subtopic
const upload = require('../config/multerConfig');

// Obtener subtemas específicos por topicId
router.get('/byTopic/:topicId', async (req, res) => {
  const { topicId } = req.params; // Obtener topicId de los parámetros de la URL
  try {
    const subtopics = await Subtopic.findAll({ where: { topicId } });
    if (subtopics) {
      res.status(200).json(subtopics);
    } else {
      res.status(404).json({ message: 'No se encontraron subtemas para el topicId especificado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los subtemas', error });
  }
});

// Obtener un subtema específico por ID
router.get('/:id', async (req, res) => {
  try {
    const subtopic = await Subtopic.findByPk(req.params.id);
    if (subtopic) {
      res.status(200).json(subtopic);
    } else {
      res.status(404).json({ message: 'Subtema no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el subtema', error });
  }
});


// Crear un nuevo subtema
router.post('/', async (req, res) => {
  const { title, description, img_url, topicId } = req.body;
  try {
    const newSubtopic = await Subtopic.create({ title, description, img_url, topicId });
    res.status(201).json(newSubtopic);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el subtema', error });
  }
});

// Actualizar un subtema existente
router.put('/:id', async (req, res) => {
  const { title, description, img_url, topicId } = req.body;
  try {
    const subtopic = await Subtopic.findByPk(req.params.id);
    if (subtopic) {
      await subtopic.update({ title, description, img_url, topicId });
      res.status(200).json(subtopic);
    } else {
      res.status(404).json({ message: 'Subtema no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el subtema', error });
  }
});

// Eliminar un subtema
router.delete('/:id', async (req, res) => {
  try {
    const subtopic = await Subtopic.findByPk(req.params.id);
    if (subtopic) {
      await subtopic.destroy();
      res.status(200).json({ message: 'Subtema eliminado correctamente' });
    } else {
      res.status(404).json({ message: 'Subtema no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el subtema', error });
  }
});

// Endpoint para subir una imagen
router.post('/upload', upload.single('image'), (req, res) => {
  try {
    res.json({ imageUrl: req.file.path }); // Devuelve la URL de la imagen
  } catch (error) {
    res.status(500).json({ error: 'Error al subir la imagen' });
  }
});





module.exports = router;