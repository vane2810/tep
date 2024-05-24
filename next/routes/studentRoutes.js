const express = require('express');
const router = express.Router();

// Ruta para la vista de estudiantes
router.get('/student', (req, res) => {
    res.render('student'); // Renderiza la vista de estudiantes
});

module.exports = router;
