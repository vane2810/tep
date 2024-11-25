// routes/gamedetailRoutes.js
const express = require('express');
const { GameDetail } = require('../models'); // Importar el modelo GameDetail
const router = express.Router();

// Crear un nuevo detalle de juego
router.post('/', async (req, res) => {
    try {
        const { gameId, config } = req.body;

        // Validación básica
        if (!gameId || !config) {
            return res.status(400).json({ message: 'El gameId y la configuración (config) son obligatorios.' });
        }

        const newGameDetail = await GameDetail.create({ gameId, config });
        return res.status(201).json(newGameDetail);
    } catch (error) {
        console.error('Error al crear el detalle del juego:', error);
        return res.status(500).json({ message: 'Error al crear el detalle del juego.' });
    }
});

// Obtener todos los detalles de juegos
router.get('/', async (req, res) => {
    try {
        const gameDetails = await GameDetail.findAll();
        return res.status(200).json(gameDetails);
    } catch (error) {
        console.error('Error al obtener los detalles de los juegos:', error);
        return res.status(500).json({ message: 'Error al obtener los detalles de los juegos.' });
    }
});

// Obtener un detalle de juego por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const gameDetail = await GameDetail.findByPk(id);

        if (!gameDetail) {
            return res.status(404).json({ message: 'Detalle del juego no encontrado.' });
        }

        return res.status(200).json(gameDetail);
    } catch (error) {
        console.error('Error al obtener el detalle del juego:', error);
        return res.status(500).json({ message: 'Error al obtener el detalle del juego.' });
    }
});

// Actualizar un detalle de juego por ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { config } = req.body;

        // Validación básica
        if (!config) {
            return res.status(400).json({ message: 'La configuración (config) es obligatoria.' });
        }

        const gameDetail = await GameDetail.findByPk(id);
        if (!gameDetail) {
            return res.status(404).json({ message: 'Detalle del juego no encontrado.' });
        }

        // Actualizar la configuración del detalle del juego
        gameDetail.config = config;
        await gameDetail.save();

        return res.status(200).json(gameDetail);
    } catch (error) {
        console.error('Error al actualizar el detalle del juego:', error);
        return res.status(500).json({ message: 'Error al actualizar el detalle del juego.' });
    }
});

// Eliminar un detalle de juego por ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const gameDetail = await GameDetail.findByPk(id);

        if (!gameDetail) {
            return res.status(404).json({ message: 'Detalle del juego no encontrado.' });
        }

        await gameDetail.destroy();
        return res.status(200).json({ message: 'Detalle del juego eliminado correctamente.' });
    } catch (error) {
        console.error('Error al eliminar el detalle del juego:', error);
        return res.status(500).json({ message: 'Error al eliminar el detalle del juego.' });
    }
});

module.exports = router;
