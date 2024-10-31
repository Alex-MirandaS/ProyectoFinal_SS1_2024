const express = require('express');
const router = express.Router();
const DetalleOrdenS = require('../services/DetalleOrdenService');
const DetalleOrdenService = new DetalleOrdenS();

// Crear un nuevo DetalleOrden
router.post('/detalleOrden', (req, res) => {
  const { idOrden, idProducto, cantidad } = req.body;
  DetalleOrdenService.create({ idOrden, idProducto, cantidad }, (insertedId) => {
      res.json({ message: 'DetalleOrden creado con éxito', id: insertedId });
  });
});

// Obtener todos los DetalleOrden
router.get('/detalleOrden', (req, res) => {
  DetalleOrdenService.getAll((detalleOrdenes) => {
    res.json(detalleOrdenes);
  });
});

// Obtener todos los DetalleOrden por IdOrden
router.get('/detalleOrden/:IdOrden', (req, res) => {
  const { IdOrden } = req.params;
  DetalleOrdenService.getById(IdOrden, (detalleOrden) => {
    res.json(detalleOrden); 
  });
});

// Eliminar todos los DetalleOrden por IdOrden
router.delete('/detalleOrden/:IdOrden', (req, res) => {
  const { IdOrden } = req.params;

  DetalleOrdenService.delete(IdOrden, (result) => {
    if (result.affectedRows > 0) {
      res.json({ message: 'DetalleOrden eliminados con éxito' });
    } else {
      res.status(404).json({ message: 'DetalleOrden no encontrado' });
    }
  });
});

module.exports = router;
