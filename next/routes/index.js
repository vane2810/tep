const express = require('express');
const router = express.Router();

// Importa las rutas para invitados y estudiantes
const guestRoutes = require('./guestRoutes');
const studentRoutes = require('./studentRoutes');

// Define las rutas principales
router.use('/guest', guestRoutes);
router.use('/student', studentRoutes);

module.exports = router;
