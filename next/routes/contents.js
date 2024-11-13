// ./routes/contents.js
const express = require('express');
const router = express.Router();
const { Content } = require('../models'); 
const upload = require('../config/multerConfig'); 

// Obtener contenidos específicos por subtopicId
router.get('/bySubtopic/:subtopicId', async (req, res) => {
    const { subtopicId } = req.params; 
    try {
        const contents = await Content.findAll({ where: { subtopicId } });
        if (contents) {
            res.status(200).json(contents);
        } else {
            res.status(404).json({ message: 'No se encontraron contenido para el topicId especificado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los contenido', error });
    }
});


// Obtener un contenido específico por ID
router.get('/:id', async (req, res) => {
    try {
        const content = await Content.findByPk(req.params.id);
        if (content) {
            res.status(200).json(content);
        } else {
            res.status(404).json({ message: 'contenido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el contenido', error });
    }
});

// Crear un nuevo contenido
router.post('/', async (req, res) => {
    const { title, description, subtopicId } = req.body;
    try {
        const newContent = await Content.create({ title, description, subtopicId });
        res.status(201).json(newContent);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el contenido', error });
    }
});

// Actualizar un contenido existente
router.put('/:id', async (req, res) => {
    const { title, description, subtopicId } = req.body;
    try {
        const content = await Content.findByPk(req.params.id);
        if (content) {
            await content.update({ title, description, subtopicId });
            res.status(200).json(content);
        } else {
            res.status(404).json({ message: 'contenido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el contenido', error });
    }
});

// Eliminar un contenido
router.delete('/:id', async (req, res) => {
    try {
        const content = await Content.findByPk(req.params.id);
        if (content) {
            await content.destroy();
            res.status(200).json({ message: 'contenido eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'contenido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el contenido', error });
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