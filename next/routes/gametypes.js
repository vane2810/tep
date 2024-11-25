// routes/gametypes.js

const express = require('express');
const router = express.Router();
const { GameType } = require('../models');

// Obtener todos los tipos de juegos
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

// Obtener instrucciones predeterminadas basadas en gametypeId
router.get('/default/:gametypeId', async (req, res) => {
    const { gametypeId } = req.params;

    try {
        const gameType = await GameType.findByPk(gametypeId);

        if (!gameType) {
            console.error(`Tipo de juego con ID ${gametypeId} no encontrado.`);
            return res.status(404).json({ message: 'Tipo de juego no encontrado.' });
        }

        res.status(200).json({
            instructions: gameType.default_instructions,
            video_url: gameType.default_video_url,
        });
    } catch (error) {
        console.error('Error al obtener las instrucciones predeterminadas:', error);
        res.status(500).json({ message: 'Error al obtener las instrucciones predeterminadas.' });
    }
});

// routes/gametypes.js
router.get('/configurations/:gametypeId', async (req, res) => {
    const { gametypeId } = req.params;

    try {
        const gameType = await GameType.findByPk(gametypeId, {
            attributes: ['id', 'type_name', 'required_data'],
        });

        if (!gameType) {
            return res.status(404).json({ message: 'Tipo de juego no encontrado.' });
        }

        res.status(200).json(gameType.required_data || {});
    } catch (error) {
        console.error('Error al obtener configuraciones del tipo de juego:', error);
        res.status(500).json({ message: 'Error al obtener configuraciones del tipo de juego.' });
    }
});


module.exports = router;
