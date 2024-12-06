const express = require('express');
const router = express.Router();
const { User, UserRelation, Level, Character } = require('../models');

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
          attributes: ['id', 'name', 'lastname', 'email', 'levelId', 'characterId'], 
          include: [
            {
              model: Character,
              as: 'character',
              attributes: ['id', 'img_url'], 
            },
            {
              model: Level,
              as: 'level', 
              attributes: ['id', 'name'], 
            },
          ],
        },
      ],
    });

    // Verificar si se encontraron relaciones
    if (!relationships.length) {
      return res.status(404).json({ message: 'No se encontraron relaciones para este tutor.' });
    }

    // Enviar la respuesta con las relaciones encontradas
    res.status(200).json({ message: 'Relaciones encontradas con éxito', data: relationships });
  } catch (error) {
    console.error('Error al obtener las relaciones:', error);
    res.status(500).json({ message: 'Hubo un error al obtener las relaciones', error: error.message });
  }
});



// Ruta para eliminar una relación entre un estudiante y un tutor
router.delete('/:guardianId/:studentId', async (req, res) => {
  const { guardianId, studentId } = req.params;

  try {
    // Buscar la relación que se desea eliminar
    const relationship = await UserRelation.findOne({
      where: {
        guardianId,
        studentId,
      },
    });

    // Verificar si la relación existe
    if (!relationship) {
      return res.status(404).json({ message: 'Relación no encontrada.' });
    }

    // Eliminar la relación
    await relationship.destroy();

    res.status(200).json({ message: 'Relación eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar la relación:', error);
    res.status(500).json({ message: 'Hubo un error al eliminar la relación', error });
  }
});



module.exports = router;

