const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/auth');

// Ejemplo de ruta protegida para administradores
router.get('/admin', authenticateToken, authorizeRole(['admin']), (req, res) => {
  res.status(200).json({ message: 'Bienvenido Admin' });
});

// Ejemplo de ruta protegida para estudiantes
router.get('/estudiante', authenticateToken, authorizeRole(['estudiante', 'admin']), (req, res) => {
  res.status(200).json({ message: 'Bienvenido Estudiante' });
});

module.exports = router;
