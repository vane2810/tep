const express = require('express');
const router = express.Router();
const { User } = require('../models'); // Asegúrate de que estás importando el modelo User correctamente

// Obtener la lista de estudiantes asociados al docente
router.get('/estudiantes/:docenteId', async (req, res) => {
    const { docenteId } = req.params;
    try {
        const estudiantes = await User.find({ docenteId, role: 'estudiante' }); // Suponiendo que tienes un campo docenteId en el modelo User y que role distingue los tipos de usuarios
        res.status(200).json(estudiantes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los estudiantes' });
    }
});

// Agregar un estudiante por correo electrónico
router.post('/agregar-estudiante', async (req, res) => {
    const { email } = req.body;
    const docenteId = req.user.id; // ID del docente extraído del token de autorización (middleware de autenticación debe estar en uso)

    try {
        const estudiante = await User.findOne({ email, role: 'estudiante' });
        if (!estudiante) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }

        // Asociar estudiante al docente
        estudiante.docenteId = docenteId;
        await estudiante.save();

        res.status(200).json(estudiante);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar al estudiante' });
    }
});

// Eliminar un estudiante asociado al docente
router.delete('/eliminar-estudiante/:estudianteId', async (req, res) => {
    const { estudianteId } = req.params;
    try {
        const estudiante = await User.findById(estudianteId);
        if (!estudiante) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }

        // Verificar si el estudiante está asociado al docente que realiza la solicitud
        if (estudiante.docenteId.toString() !== req.user.id) {
            return res.status(403).json({ error: 'No autorizado para eliminar este estudiante' });
        }

        // Eliminar la relación con el docente
        estudiante.docenteId = null;
        await estudiante.save();

        res.status(200).json({ message: 'Estudiante eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar al estudiante' });
    }
});

module.exports = router;
