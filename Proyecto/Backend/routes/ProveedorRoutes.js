const express = require('express');
const router = express.Router();
const ProveedorS = require('../services/ProveedorService');
const ProveedorService = new ProveedorS();

// Crear un nuevo proveedor
router.post('/proveedor', (req, res) => {
  const { nombre } = req.body;
  ProveedorService.create({ nombre }, (result) => {
    res.json({ message: 'Proveedor creado con éxito'});
  });
});

// Obtener todos los proveedores
router.get('/proveedor', (req, res) => {
  ProveedorService.getAll((proveedores) => {
    res.json(proveedores);
  });
});

// Obtener un usuario por ID
router.get('/proveedor/:id', (req, res) => {
  const { id } = req.params;
  ProveedorService.getById(id, (proveedor) => {
    if (proveedor) {
      res.json(proveedor);
    } else {
      res.status(404).json({ message: 'Proveedor no encontrado' });
    }
  });
});

module.exports = router;
