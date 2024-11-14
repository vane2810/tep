// ./routes/gameDetailRoutes.js
const express = require('express');
const router = express.Router();
const { GameDetail } = require('../models');

// Obtener detalles de juegos específicos por gameId
router.get('/byGame/:gameId', async (req, res) => {
    const { gameId } = req.params;
    try {
        const gameDetails = await GameDetail.findAll({ where: { gameId } });
        if (gameDetails.length > 0) {
            res.status(200).json(gameDetails);
        } else {
            res.status(404).json({ message: 'No se encontraron detalles para el gameId especificado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los detalles del juego', error });
    }
});

// Crear un nuevo detalle de juego
router.post('/', async (req, res) => {
    const { gameTypeId, gameId, json_url } = req.body; // Nota que ahora solo recibimos `gameTypeId`, `gameId`, y `json_url`
    try {
        const newGame = await GameDetail.create({
            gameTypeId,
            gameId,
            json_url, // Guardamos la URL del archivo JSON
        });
        res.status(201).json(newGame);
    } catch (error) {
        console.error("Error al crear el detalle del juego:", error);
        res.status(500).json({ message: 'Error al crear el detalle del juego', error });
    }
});

// Actualizar un detalle de juego existente
router.put('/:id', async (req, res) => {
    const { gameTypeId, gameId, json_url } = req.body;
    try {
        const gameDetail = await GameDetail.findByPk(req.params.id);
        if (gameDetail) {
            await gameDetail.update({
                gameTypeId,
                gameId,
                json_url, // Actualizar la URL del archivo JSON si es necesario
            });
            res.status(200).json(gameDetail);
        } else {
            res.status(404).json({ message: 'Detalle del juego no encontrado' });
        }
    } catch (error) {
        console.error("Error al actualizar el detalle del juego:", error);
        res.status(500).json({ message: 'Error al actualizar el detalle del juego', error });
    }
});

// Eliminar un detalle de juego
router.delete('/:id', async (req, res) => {
    try {
        const gameDetail = await GameDetail.findByPk(req.params.id);
        if (gameDetail) {
            await gameDetail.destroy();
            res.status(200).json({ message: 'Detalle del juego eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Detalle del juego no encontrado' });
        }
    } catch (error) {
        console.error("Error al eliminar el detalle del juego:", error);
        res.status(500).json({ message: 'Error al eliminar el detalle del juego', error });
    }
});

module.exports = router;
