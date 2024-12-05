
const express = require('express');
const router = express.Router();
const { StudentProgre, User, Game } = require('../models'); 


// Obtener el progreso de un estudiante específico para un juego específico
router.get('/:student_id/:game_id', async (req, res) => {
    const { student_id, game_id } = req.params;

    try {
        // Buscar el registro de progreso para ese estudiante y juego específico
        const progress = await StudentProgre.findOne({
            where: {
                student_id,
                game_id,
            },
        });

        if (progress) {
            res.status(200).json(progress);
        } else {
            res.status(404).json({ message: 'Progreso no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el progreso:', error);
        res.status(500).json({ message: 'Error al obtener el progreso', error });
    }
});

// Crear un nuevo registro de progreso
router.post('/', async (req, res) => {
    const { student_id, game_id, status, score } = req.body;

    try {
        // Verificar si el usuario y el juego existen
        const user = await User.findByPk(student_id);
        const game = await Game.findByPk(game_id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (!game) {
            return res.status(404).json({ message: 'Juego no encontrado' });
        }

        // Crear el progreso
        const newProgress = await StudentProgre.create({ student_id, game_id, status, score });
        res.status(201).json(newProgress);
    } catch (error) {
        console.error('Error al crear el registro de progreso:', error);
        res.status(500).json({ message: 'Error al crear el registro de progreso', error });
    }
});


// Actualizar un registro de progreso existente
router.put('/:student_id/:game_id', async (req, res) => {
    const { student_id, game_id } = req.params;
    const { score, status } = req.body;

    try {
        // Buscar el registro de progreso para ese estudiante y juego específico
        const progress = await StudentProgre.findOne({
            where: {
                student_id,
                game_id,
            },
        });

        if (!progress) {
            return res.status(404).json({ message: 'Progreso no encontrado para actualizar' });
        }

        // Actualizar el registro de progreso
        progress.score = score;
        progress.status = status;
        await progress.save();

        res.status(200).json(progress);
    } catch (error) {
        console.error('Error al actualizar el registro de progreso:', error);
        res.status(500).json({ message: 'Error al actualizar el registro de progreso', error });
    }
});


module.exports = router;