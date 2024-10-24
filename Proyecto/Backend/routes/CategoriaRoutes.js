const express = require('express');
const router = express.Router();
const CategoriaS = require('../services/CategoriaService');
const CategoriaService = new CategoriaS();

// Crear una nueva categoria
router.post('/categoria', (req, res) => {
  const { categoria } = req.body;
  CategoriaService.create({ categoria }, (result) => {
    res.json({ message: 'Categoría creada con éxito'});
  });
});

// Obtener todas las categorias
router.get('/categoria', (req, res) => {
  CategoriaService.getAll((categorias) => {
    res.json(categorias);
  });
});

// Obtener un usuario por ID
router.get('/categoria/:id', (req, res) => {
  const { id } = req.params;
  CategoriaService.getById(id, (categoria) => {
    if (categoria) {
      res.json(categoria);
    } else {
      res.status(404).json({ message: 'Categoría no encontrado' });
    }
  });
});

module.exports = router;
