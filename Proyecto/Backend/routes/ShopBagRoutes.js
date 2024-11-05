const express = require('express');
const router = express.Router();
const ShopBagS = require('../services/ShopBagService');
const ShopBagService = new ShopBagS();

// Crear un nuevo shopBag
router.post('/shopBag', (req, res) => {
  const { idUsuario, idArticulo, cantidad, seleccionado } = req.body;
  ShopBagService.create({ idUsuario, idArticulo, cantidad, seleccionado }, (insertedId) => {
      res.json({ message: 'ShopBag creada con éxito', id: insertedId });
  });
});

// Obtener todos los articuloCategorias
router.get('/shopBag', (req, res) => {
  ShopBagService.getAll((shopBags) => {
    res.json(shopBags);
  });
});

// Obtener ShopBag por IdUsuario
router.get('/shopBag/:idUsuario', (req, res) => {
  const { idUsuario } = req.params;
  ShopBagService.getById(false,idUsuario, (shopBag) => {
      res.json(shopBag);
  });
});

// Obtener ShopBag por IdUsuario y articulos seleccionados
router.get('/shopBag/seleccionado/:idUsuario', (req, res) => {
  const { idUsuario } = req.params;
  ShopBagService.getById(true,idUsuario, (shopBag) => {
      res.json(shopBag);
  });
});

// Eliminar ShopBag por IdUsuario
router.delete('/shopBag/:idUsuario', (req, res) => {
  const { idUsuario } = req.params;
  
  ShopBagService.delete(idUsuario, (result) => {
    if (result.affectedRows > 0) {
      res.json({ message: 'ShopBag eliminados con éxito' });
    } else {
      res.status(404).json({ message: 'ShopBag no encontrado' });
    }
  });
});

// Obtener el total de los articulos del ShopBag
router.get('/shopBag/total/:idUsuario', (req, res) => {
  const { idUsuario } = req.params;
  ShopBagService.getTotal(idUsuario, (total) => {
      console.log('Resultado de Base de datos: ',total);
      res.json(total);
  });
});

module.exports = router;
