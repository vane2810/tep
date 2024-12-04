const express = require('express');
const router = express.Router();
const { User, UserRelation } = require('../models');

// Ruta para crear una nueva relación entre estudiante y tutor mediante el ID del tutor
router.post('/', async (req, res) => {
  const { studentEmail, guardianId } = req.body;

  try {
    // Verificar si se proporciona el correo electrónico del estudiante y el ID del tutor
    if (!studentEmail || !guardianId) {
      return res.status(400).json({ message: 'El correo del estudiante y el ID del tutor son obligatorios.' });
    }

    // Buscar el estudiante en la base de datos por correo electrónico
    const student = await User.findOne({ where: { email: studentEmail } });
    if (!student) {
      return res.status(404).json({ message: 'Estudiante no encontrado con el correo proporcionado' });
    }

    // Buscar el tutor/padre en la base de datos por ID
    const guardian = await User.findByPk(guardianId);
    if (!guardian) {
      return res.status(404).json({ message: 'Tutor/Padre no encontrado con el ID proporcionado' });
    }

    // Crear la relación
    const newRelationship = await UserRelation.create({
      studentId: student.id,
      guardianId: guardian.id,
    });

    res.status(201).json({
      message: 'Relación creada con éxito',
      data: newRelationship,
    });
  } catch (error) {
    console.error('Error al crear la relación:', error);
    res.status(500).json({ message: 'Hubo un error al crear la relación', error });
  }
});


// Ruta para obtener las relaciones del tutor autenticado
router.get('/:guardianId', async (req, res) => {
  const { guardianId } = req.params;

  try {
    // Buscar relaciones donde el guardianId coincide
    const relationships = await UserRelation.findAll({
      where: { guardianId },
      include: [
        {
          model: User,
          as: 'studentInfo',
          attributes: ['id', 'name', 'email'], // Incluir solo los campos necesarios del estudiante
        }
      ],
    });

    // Verificar si se encontraron relaciones
    if (!relationships.length) {
      return res.status(404).json({ message: 'No se encontraron relaciones para este tutor.' });
    }

    res.status(200).json({ message: 'Relaciones encontradas con éxito', data: relationships });
  } catch (error) {
    console.error('Error al obtener las relaciones:', error);
    res.status(500).json({ message: 'Hubo un error al obtener las relaciones', error });
  }
});

module.exports = router;
