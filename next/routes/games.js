// routes/games.js

const express = require('express');
const router = express.Router();
const { Game, GameType } = require('../models');

// Obtener juegos específicos por contentId
router.get('/byContent/:contentId', async (req, res) => {
    const { contentId } = req.params;
    try {
        const games = await Game.findAll({
            where: { contentId },
            include: [
                {
                    model: GameType,
                    as: 'gameType',
                    attributes: ['id', 'type_name', 'default_instructions', 'default_video_url'],
                },
            ],
        });
        if (games.length > 0) {
            res.status(200).json(games);
        } else {
            res.status(404).json({ message: 'No se encontraron juegos para el contentId especificado' });
        }
    } catch (error) {
        console.error('Error al obtener los juegos:', error);
        res.status(500).json({ message: 'Error al obtener los juegos', error });
    }
});

// Obtener un juego específico por ID
router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id, {
            include: [
                {
                    model: GameType,
                    as: 'gameType',
                    attributes: ['id', 'type_name', 'default_instructions', 'default_video_url'],
                },
            ],
        });
        if (game) {
            res.status(200).json(game);
        } else {
            console.error(`Juego con ID ${req.params.id} no encontrado.`);
            res.status(404).json({ message: 'Juego no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el juego:', error);
        res.status(500).json({ message: 'Error al obtener el juego', error });
    }
});

// Crear un nuevo juego
router.post('/', async (req, res) => {
    const { title, img_url, contentId, gametype_id } = req.body;
    try {
        if (!gametype_id) {
            return res.status(400).json({ message: 'El campo gametype_id es obligatorio.' });
        }

        // Verificar si el gametype_id existe
        const gameTypeExists = await GameType.findByPk(gametype_id);
        if (!gameTypeExists) {
            return res.status(400).json({ message: 'El tipo de juego no existe.' });
        }

        const newGame = await Game.create({ title, img_url, contentId, gametype_id });
        res.status(201).json(newGame);
    } catch (error) {
        console.error('Error al crear el juego:', error);
        res.status(500).json({ message: 'Error al crear el juego', error });
    }
});

// Actualizar un juego existente
router.put('/:id', async (req, res) => {
    const { title, img_url, contentId, gametype_id } = req.body;
    try {
        const game = await Game.findByPk(req.params.id);
        if (game) {
            if (gametype_id) {
                // Verificar si el gametype_id existe
                const gameTypeExists = await GameType.findByPk(gametype_id);
                if (!gameTypeExists) {
                    return res.status(400).json({ message: 'El tipo de juego no existe.' });
                }
            }
            await game.update({ title, img_url, contentId, gametype_id });
            res.status(200).json(game);
        } else {
            console.error(`Juego con ID ${req.params.id} no encontrado.`);
            res.status(404).json({ message: 'Juego no encontrado' });
        }
    } catch (error) {
        console.error('Error al actualizar el juego:', error);
        res.status(500).json({ message: 'Error al actualizar el juego', error });
    }
});

// Eliminar un juego
router.delete('/:id', async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id);
        if (game) {
            await game.destroy();
            res.status(200).json({ message: 'Juego eliminado correctamente' });
        } else {
            console.error(`Juego con ID ${req.params.id} no encontrado.`);
            res.status(404).json({ message: 'Juego no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar el juego:', error);
        res.status(500).json({ message: 'Error al eliminar el juego', error });
    }
});

module.exports = router;
