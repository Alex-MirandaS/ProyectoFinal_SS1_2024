const express = require('express');
const router = express.Router();
const OrdenS = require('../services/OrdenService');
const OrdenService = new OrdenS();

// Crear una nueva orden
router.post('/orden', (req, res) => {
  const { idUsuario, total, idEstadoOrden} = req.body;

  OrdenService.create({ idUsuario, total, idEstadoOrden }, (insertedId) => {
    if (insertedId) {
      res.json({ message: 'Orden creada con éxito', id: insertedId });
    } else {
      res.status(500).json({ message: 'Error al crear la Orden' });
    }
  });
});

// Obtener todas las ordenes
router.get('/orden', (req, res) => {
  OrdenService.getAll((ordenes) => {
    res.json(ordenes);
  });
});

// Obtener una orden por ID
router.get('/orden/:id', (req, res) => {
  const { id } = req.params;
  OrdenService.getById('id',id, (orden) => {
      res.json(orden);
  });
});


// Obtener ordenes por IDUsuario
router.get('/orden/usuario/:idUsuario', (req, res) => {
  const { idUsuario } = req.params;
  OrdenService.getById('idUsuario',idUsuario, (ordenes) => {
      res.json(ordenes);
  });
});

// Eliminar una orden por ID
router.delete('/orden/:id', (req, res) => {
  const { id } = req.params;
  
  OrdenService.delete(id, (result) => {
    if (result.affectedRows > 0) {
      res.json({ message: 'Orden eliminada con éxito' });
    } else {
      res.status(404).json({ message: 'Orden no encontrada' });
    }
  });
});

module.exports = router;
