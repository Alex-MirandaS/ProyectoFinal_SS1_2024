const express = require('express');
const router = express.Router();
const ArticuloS = require('../services/ArticuloService');
const ArticuloService = new ArticuloS();

// Crear un nuevo articulo
router.post('/articulo', (req, res) => {
  const { titulo, precio, imagen, descripcion, idEstado, idTipoArticulo, idUsuario, idProveedor } = req.body;
  ArticuloService.create({ titulo, precio, imagen, descripcion, idEstado, idTipoArticulo, idUsuario, idProveedor  }, (insertedId) => {
    if (insertedId) {
        res.json({ message: 'Artículo creado con éxito', id: insertedId });
    } else {
        res.status(500).json({ message: 'Error al crear el artículo' });
    }
});
});

// Obtener todos los artículos
router.get('/articulo', (req, res) => {
  ArticuloService.getAll((articulos) => {
    res.json(articulos);
  });
}); 

// Obtener un artículo por ID
router.get('/articulo/:id', (req, res) => {
  const { id } = req.params;
  ArticuloService.getById(id, (articulo) => {
    if (articulo) {
      res.json(articulo);
    } else {
      res.status(404).json({ message: 'Artículo no encontrado' });
    }
  });
});

// Actualizar un artículo por ID
router.put('/articulo/:id', (req, res) => {
  const { id } = req.params;
  const { data, columnName } = req.body;
  ArticuloService.updateById(id, data, columnName, (result) => {
    if (result.affectedRows > 0) {
      res.json({ message: 'Artículo actualizado con éxito' });
    } else {
      res.status(404).json({ message: 'Artículo no encontrado' });
    }
  });
});

// Eliminar un artículo por ID
router.delete('/articulo/:id', (req, res) => {
  const { id } = req.params;
  
  ArticuloService.delete(id, (result) => {
    if (result.affectedRows > 0) {
      res.json({ message: 'Articulo eliminado con éxito' });
    } else {
      res.status(404).json({ message: 'Articulo no encontrado' });
    }
  });
});

module.exports = router;
