const express = require('express');
const router = express.Router();
const RolS = require('../services/RolService');
const RolService = new RolS();

// Crear un nuevo rol
router.post('/rol', (req, res) => {
  const { rol } = req.body;
  RolService.create({ rol }, (insertedId) => {
    if (insertedId) {
      res.json({ message: 'Rol creado con éxito', id: insertedId });
    } else {
      res.status(500).json({ message: 'Error al crear el Rol' });
    }
  });
});

// Obtener todos los roles
router.get('/rol', (req, res) => {
    RolService.getAll((roles) => {
    res.json(roles);
  });
});

// Obtener un rol por ID
router.get('/rol/:id', (req, res) => {
  const { id } = req.params;
  RolService.getById(id, (rol) => {
    if (rol) {
      res.json(rol);
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  });
});

// Eliminar un rol por id
router.delete('/rol/:id', (req, res) => {
  const { id } = req.params;
  
  RolService.delete(id, (result) => {
    if (result.affectedRows > 0) {
      res.json({ message: 'Rol eliminado con éxito' });
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  });
});

module.exports = router;
