const express = require('express');
const router = express.Router();
const { Game } = require('../models');
const upload = require('../config/multerConfig');

// Obtener juegos específicos por contentId
router.get('/byContent/:contentId', async (req, res) => {
    const { contentId } = req.params;
    try {
        const games = await Game.findAll({ where: { contentId } });
        if (games.length > 0) {
            res.status(200).json(games);
        } else {
            res.status(404).json({ message: 'No se encontraron juegos para el contentId especificado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los juegos', error });
    }
});

// Obtener un juego específico por ID
router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id);
        if (game) {
            res.status(200).json(game);
        } else {
            res.status(404).json({ message: 'Juego no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el juego', error });
    }
});

// Crear un nuevo juego
router.post('/', async (req, res) => {
    const { title, img_url, contentId, gametype_id } = req.body; // Incluimos gametype_id
    try {
        if (!gametype_id) {
            return res.status(400).json({ message: 'El campo gametype_id es obligatorio.' });
        }

        const newGame = await Game.create({ title, img_url, contentId, gametype_id });
        res.status(201).json(newGame);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el juego', error });
    }
});

// Actualizar un juego existente
router.put('/:id', async (req, res) => {
    const { title, img_url, contentId, gametype_id } = req.body;
    try {
        const game = await Game.findByPk(req.params.id);
        if (game) {
            await game.update({ title, img_url, contentId, gametype_id });
            res.status(200).json(game);
        } else {
            res.status(404).json({ message: 'Juego no encontrado' });
        }
    } catch (error) {
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
            res.status(404).json({ message: 'Juego no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el juego', error });
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
