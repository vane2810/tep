
const express = require('express');
const router = express.Router();
const { StudentProgre, User, Game } = require('../models'); 

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


// Obtener todos los registros de progreso de un usuario específico
router.get('/byUser/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const progressRecords = await StudentProgre.findAll({
            where: { userId },
            include: [
                {
                    model: Game,
                    as: 'game',
                    attributes: ['id', 'title', 'gametype_id'],
                },
            ],
        });

        if (progressRecords.length > 0) {
            res.status(200).json(progressRecords);
        } else {
            res.status(404).json({ message: 'No se encontraron registros de progreso para el usuario especificado' });
        }
    } catch (error) {
        console.error('Error al obtener los registros de progreso:', error);
        res.status(500).json({ message: 'Error al obtener los registros de progreso', error });
    }
});

// Nueva ruta para reiniciar el progreso de un juego para un estudiante
router.put('/reset', async (req, res) => {
    const { student_id, game_id } = req.body;

    try {
        // Verificar si el progreso del estudiante en el juego existe
        const progress = await StudentProgre.findOne({
            where: { student_id, game_id },
        });

        if (!progress) {
            return res.status(404).json({ message: 'Progreso no encontrado para este estudiante y juego' });
        }

        // Reiniciar el progreso
        progress.status = 'pendiente'; // El estado puede ser 'pendiente' para reiniciarlo
        progress.score = 0; // Reiniciamos el puntaje
        await progress.save();

        res.status(200).json({ message: 'Progreso reiniciado correctamente', progress });
    } catch (error) {
        console.error('Error al reiniciar el progreso:', error);
        res.status(500).json({ message: 'Error al reiniciar el progreso', error });
    }
});

// Eliminar un registro de progreso (opcional)
router.delete('/:progressId', async (req, res) => {
    const { progressId } = req.params;

    try {
        const progress = await StudentProgre.findByPk(progressId);

        if (!progress) {
            return res.status(404).json({ message: 'Registro de progreso no encontrado' });
        }

        await progress.destroy();
        res.status(200).json({ message: 'Registro de progreso eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el registro de progreso:', error);
        res.status(500).json({ message: 'Error al eliminar el registro de progreso', error });
    }
});

module.exports = router;