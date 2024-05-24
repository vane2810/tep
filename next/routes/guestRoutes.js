const express = require('express');
const router = express.Router();

// Ruta para la vista de invitados
router.get('/guest', (req, res) => {
    res.render('guest'); // Renderiza la vista de invitados
});

module.exports = router;
