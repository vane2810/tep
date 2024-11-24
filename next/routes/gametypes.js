const express = require('express');
const router = express.Router();
const { Game, GameType } = require('../models');

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


router.get('/default/:gametypeId', async (req, res) => {
    const { gametypeId } = req.params;

    try {
        const gameType = await GameType.findByPk(gametypeId);

        if (!gameType) {
            return res.status(404).json({ message: 'Tipo de juego no encontrado.' });
        }

        // Asegúrate de extraer el campo `default_instructions` y la `default_video_url`
        res.status(200).json({
            instructions: gameType.default_instructions, // Cambié `description` por `default_instructions`
            video_url: gameType.default_video_url, // Sigue extrayendo `default_video_url` como estaba antes
        });
    } catch (error) {
        console.error('Error al obtener las instrucciones predeterminadas:', error);
        res.status(500).json({ message: 'Error al obtener las instrucciones predeterminadas.' });
    }
});



module.exports = router;