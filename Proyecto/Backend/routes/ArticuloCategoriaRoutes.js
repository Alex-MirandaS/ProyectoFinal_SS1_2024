const express = require('express');
const router = express.Router();
const ArticuloCategoriaS = require('../services/ArticuloCategoriaService');
const ArticuloCategoriaService = new ArticuloCategoriaS();

// Crear un nuevo articuloCategoria
router.post('/articuloCategoria', (req, res) => {
  const { idCategoria, idArticulo } = req.body;
  ArticuloCategoriaService.create({ idCategoria, idArticulo }, (result) => {
    res.json({ message: 'ArtículoCategoria creado con éxito'});
  });
});

// Obtener todos los articuloCategorias
router.get('/articuloCategoria', (req, res) => {
  ArticuloCategoriaService.getAll((articuloCategorias) => {
    res.json(articuloCategorias);
  });
});

// Obtener un articuloCategoria por IDArticulo
router.get('/articuloCategoria/articulo/:idArticulo', (req, res) => {
  const { idArticulo } = req.params;
  ArticuloCategoriaService.getById("idArticulo",idArticulo, (articuloCategoria) => {
      res.json(articuloCategoria);
  });
});

// Obtener un articuloCategoria por IDCategoría
router.get('/articuloCategoria/categoria/:idCategoria', (req, res) => {
  const { idCategoria } = req.params;
  ArticuloCategoriaService.getById("idCategoria",idCategoria, (articuloCategoria) => {
      res.json(articuloCategoria);
  });
});

// Eliminar un articuloCategoria por IDArticulo
router.delete('/articuloCategoria/:idArticulo', (req, res) => {
  const { idArticulo } = req.params;
  
  ArticuloCategoriaService.delete(idArticulo, (result) => {
    if (result.affectedRows > 0) {
      res.json({ message: 'ArticuloCategorias eliminados con éxito' });
    } else {
      res.status(404).json({ message: 'ArticuloCategorias no encontrado' });
    }
  });
});

module.exports = router;
