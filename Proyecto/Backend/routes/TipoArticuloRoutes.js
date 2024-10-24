const express = require('express');
const router = express.Router();
const TipoArticuloS = require('../services/TipoArticuloService');
const TipoArticuloService = new TipoArticuloS();

// Crear un nuevo tipoArticulo
router.post('/tipoArticulo', (req, res) => {
  const { titulo } = req.body;
  TipoArticuloService.create({ titulo }, (result) => {
    res.json({ message: 'TipoArticulo creado con éxito'});
  });
});

// Obtener todos los tipoArticulos
router.get('/tipoArticulo', (req, res) => {
  TipoArticuloService.getAll((tipoArticulos) => {
    res.json(tipoArticulos);
  });
});

// Obtener un tipoArticulo por ID
router.get('/tipoArticulo/:id', (req, res) => {
  const { id } = req.params;
  TipoArticuloService.getById(id, (tipoArticulo) => {
    if (tipoArticulo) {
      res.json(tipoArticulo);
    } else {
      res.status(404).json({ message: 'TipoArticulo no encontrado' });
    }
  });
});

module.exports = router;
