const express = require('express');
const router = express.Router();
const { Subtopic } = require('../models'); // Importar el modelo de Topic

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

module.exports = router;