const express = require('express');
const router = express.Router();
const UsuarioS = require('../services/RolService');
const UsuarioService = new UsuarioS();

// Crear un nuevo usuario
router.post('/usuario', (req, res) => {
  const { nombre, apellido, username, password, idRol } = req.body;
  UsuarioService.create({ nombre, apellido, username, password, idRol }, (result) => {
    res.json({ message: 'Usuario creado con éxito'});
  });
});

// Obtener todos los usuarios
router.get('/usuario', (req, res) => {
  UsuarioService.getAll((usuarios) => {
    res.json(usuarios);
  });
});

// Obtener un usuario por ID
router.get('/usuario/:id', (req, res) => {
  const { id } = req.params;
  UsuarioService.getById(id, (usuario) => {
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  });
});

// Actualizar un usuario 
router.put('/usuario/:id', (req, res) => {
  const { id } = req.params;
  const { data, columnName } = req.body;
  UsuarioService.updateById(id, data, columnName, (result) => {
    if (result.affectedRows > 0) {
      res.json({ message: 'Usuario actualizado con éxito' });
    } else {
      res.status(404).json({ message: 'Rol no encontrado' });
    }
  });
});

router.delete('/usuario/:id', (req, res) => {
  const { id } = req.params;
  
  UsuarioService.delete(id, (result) => {
    if (result.affectedRows > 0) {
      res.json({ message: 'Usuario eliminado con éxito' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  });
});
module.exports = router;
