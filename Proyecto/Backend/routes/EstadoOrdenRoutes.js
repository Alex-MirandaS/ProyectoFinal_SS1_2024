const express = require('express');
const router = express.Router();
const EstadoOrdenS = require('../services/EstadoOrdenService');
const EstadoOrdenService = new EstadoOrdenS();

// Crear un nuevo estadoOrden
router.post('/estadoOrden', (req, res) => {
  const { estado, descripcion } = req.body;
  EstadoOrdenService.create({ estado, descripcion }, (result) => {
    res.json({ message: 'EstadoOrden creado con éxito'});
  });
});

// Obtener todos los estadosOrden
router.get('/estadoOrden', (req, res) => {
  EstadoOrdenService.getAll((estadosOrden) => {
    res.json(estadosOrden);
  });
});

// Obtener un estadoOrden por ID
router.get('/estadoOrden/:id', (req, res) => {
  const { id } = req.params;
  EstadoOrdenService.getById(id, (estadoOrden) => {
    if (estadoOrden) {
      res.json(estadoOrden);
    } else {
      res.status(404).json({ message: 'EstadoOrden no encontrado' });
    }
  });
});

// Actualizar un estadoOrden por ID
router.put('/estadoOrden/:id', (req, res) => {
  const { id } = req.params;
  const { data, columnName } = req.body;
  EstadoOrdenService.updateById(id, data, columnName, (result) => {
    if (result.affectedRows > 0) {
      res.json({ message: 'EstadoOrden actualizado con éxito' });
    } else {
      res.status(404).json({ message: 'EstadoOrden no encontrado' });
    }
  });
});

// Eliminar un estadoOrden por ID
router.delete('/estadoOrden/:id', (req, res) => {
  const { id } = req.params;
  
  EstadoOrdenService.delete(id, (result) => {
    if (result.affectedRows > 0) {
      res.json({ message: 'EstadoOrden eliminado con éxito' });
    } else {
      res.status(404).json({ message: 'EstadoOrden no encontrado' });
    }
  });
});

module.exports = router;
