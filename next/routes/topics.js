const express = require('express');
const router = express.Router();
const { Topic } = require('../models'); // Importar el modelo de Topic

// Obtener todos los topics
router.get('/', async (req, res) => {
  try {
    const topics = await Topic.findAll(); // Obtener todos los temas usando Sequelize.
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los topics", error });
  }
});



module.exports = router;
