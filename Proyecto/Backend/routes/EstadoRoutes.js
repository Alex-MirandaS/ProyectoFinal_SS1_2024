const express = require('express');
const router = express.Router();
const EstadoS = require('../services/EstadoService');
const EstadoService = new EstadoS();

// Crear un nuevo estado
router.post('/estado', (req, res) => {
  const { estado } = req.body;
  EstadoService.create({ estado }, (result) => {
    res.json({ message: 'Estado creado con éxito'});
  });
});

// Obtener todos los estados
router.get('/estado', (req, res) => {
  EstadoService.getAll((estados) => {
    res.json(estados);
  });
});

// Obtener un estado por ID
router.get('/estado/:id', (req, res) => {
  const { id } = req.params;
  EstadoService.getById(id, (estado) => {
    if (estado) {
      res.json(estado);
    } else {
      res.status(404).json({ message: 'Estado no encontrado' });
    }
  });
});

module.exports = router;
