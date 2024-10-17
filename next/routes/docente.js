const express = require('express');
const router = express.Router();
const { User } = require('../models'); 

router.get('/estudiantes/:docenteId', async (req, res) => {
    const { docenteId } = req.params;
    try {
        const estudiantes = await User.find({ docenteId, role: 'estudiante' });
        res.status(200).json(estudiantes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los estudiantes' });
    }
});

router.post('/agregar-estudiante', async (req, res) => {
    const { email } = req.body;
    const docenteId = req.user.id;

    try {
        const estudiante = await User.findOne({ email, role: 'estudiante' });
        if (!estudiante) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }

        estudiante.docenteId = docenteId;
        await estudiante.save();

        res.status(200).json(estudiante);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar al estudiante' });
    }
});

router.delete('/eliminar-estudiante/:estudianteId', async (req, res) => {
    const { estudianteId } = req.params;
    try {
        const estudiante = await User.findById(estudianteId);
        if (!estudiante) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }

        if (estudiante.docenteId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'No autorizado para eliminar este estudiante' });
        }

        estudiante.docenteId = null;
        await estudiante.save();

        res.status(200).json({ message: 'Estudiante eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar al estudiante' });
    }
});

module.exports = router;
