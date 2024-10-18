// routes/userRelationshipsRoutes.js
const express = require('express');
const { User, UserRelationship } = require('../models');

const router = express.Router();

// Crear una relación entre estudiante y guardián usando correo electrónico
router.post('/', async (req, res) => {
    const { email, guardianId, role } = req.body;
    console.log('Datos recibidos:', { email, guardianId, role });

    try {
        const student = await User.findOne({ where: { email } });

        if (!student) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }

        const newRelationship = await UserRelationship.create({
            studentId: student.id,
            guardianId,
            role,
        });

        res.status(201).json(newRelationship);
    } catch (error) {
        console.error('Error al crear la relación:', error);
        res.status(500).json({ error: 'Error al crear la relación.' });
    }
});


router.get('/guardians/:guardianId/students', async (req, res) => {
    const { guardianId } = req.params;

    console.log('Recibida solicitud para guardianId:', guardianId);  // Verifica si el backend recibe la solicitud

    try {
        const guardian = await User.findByPk(guardianId, {
            include: {
                model: UserRelationship,
                as: 'students',
                include: [{ model: User, as: 'studentInfo' }]
            }
        });

        if (!guardian) {
            return res.status(404).json({ error: 'Guardián no encontrado' });
        }

        console.log('Datos de estudiantes relacionados:', guardian.students);  // Verifica si se encuentran estudiantes

        const estudiantes = guardian.students.map(rel => ({
            id: rel.studentInfo.id,
            name: rel.studentInfo.name,
            email: rel.studentInfo.email,
            relationshipId: rel.id
        }));

        res.status(200).json(estudiantes);
    } catch (error) {
        console.error('Error al obtener los estudiantes:', error);
        res.status(500).json({ error: 'Error al obtener los estudiantes.' });
    }
});



// Eliminar una relación entre estudiante y guardián
router.delete('/relationships/:relationshipId', async (req, res) => {
    const { relationshipId } = req.params;

    try {
        const relationship = await UserRelationship.findByPk(relationshipId);

        if (!relationship) {
            return res.status(404).json({ error: 'Relación no encontrada' });
        }

        await relationship.destroy();
        res.status(200).json({ message: 'Relación eliminada correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la relación.' });
    }
});

module.exports = router;
