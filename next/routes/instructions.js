const express = require('express');
const router = express.Router();
const { Instruction } = require('../models');

// Obtener instrucciones por juego
router.get('/byGame/:gameId', async (req, res) => {
    const { gameId } = req.params;
    try {
        const instructions = await Instruction.findAll({ where: { game_id: gameId } });
        if (instructions.length > 0) {
            res.status(200).json(instructions);
        } else {
            res.status(404).json({ message: 'No se encontraron instrucciones para el gameId especificado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las instrucciones', error });
    }
});



// Crear una nueva instrucción
router.post('/', async (req, res) => {
    const { points_max, points_min, game_id } = req.body;

    console.log("Datos recibidos para crear:", req.body);

    try {
        // Validar que los campos obligatorios estén presentes
        if (!game_id) {
            return res.status(400).json({ error: 'El campo game_id es obligatorio.' });
        }

        const newInstruction = await Instruction.create({ points_max, points_min, game_id });
        res.status(201).json(newInstruction);
    } catch (error) {
        console.error('Error al crear la instrucción:', error);
        res.status(500).json({ error: 'Error al crear la instrucción' });
    }
});

// Editar una instrucción existente
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { points_max, points_min } = req.body;

    console.log("Datos recibidos para editar:", req.body);

    try {
        const instruction = await Instruction.findByPk(id);
        if (!instruction) {
            return res.status(404).json({ message: 'Instrucción no encontrada.' });
        }

        await instruction.update({ points_max, points_min });
        res.status(200).json(instruction);
    } catch (error) {
        console.error('Error al editar la instrucción:', error);
        res.status(500).json({ message: 'Error al editar la instrucción.', error });
    }
});

module.exports = router;