const express = require('express');
const router = express.Router();
const { GameType } = require('../models');

// Ruta para obtener todos los tipos de juegos
router.get('/', async (req, res) => {
    try {
        const gametypes = await GameType.findAll({
            attributes: ['id', 'type_name'], // Selecciona solo los campos necesarios
        });
        res.status(200).json(gametypes);
    } catch (error) {
        console.error('Error al obtener los tipos de juegos:', error);
        res.status(500).json({ message: 'Error al obtener los tipos de juegos' });
    }
});

module.exports = router;