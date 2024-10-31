const express = require('express');
const router = express.Router();
const UsuarioS = require('../services/UsuarioService');
const UsuarioService = new UsuarioS();
const { checkEmailExistence } = require('../controllers/ControlPasarelaPagos');

// Crear un nuevo usuario
router.post('/usuario', async (req, res) => {
  const { nombre, apellido, email, password, idRol, idPasarelaPago} = req.body;
  try {
    const emailExists = await checkEmailExistence(email, idPasarelaPago);
    if (emailExists.tieneCuenta) {
      const hashedPassword = await UsuarioService.getHashedPassword(password);
      UsuarioService.create({ nombre, apellido, email, hashedPassword, idRol }, (insertedId) => {
        if (insertedId) {
          res.json({ message: 'Usuario creado con éxito', id: insertedId });
        } else {
          res.status(500).json({ message: 'Error al crear el Usuario' });
        }
      });
    }else{
      res.status(500).json({ message: 'No se puede crear un usuario si el correo no existe en la pasarela de pagos' });
    }
  } catch (error) {
    console.error('Error al verificar el correo:', error.message);
    res.status(500).json({ message: 'Error al procesar la solicitud' });
  }
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

router.post('/usuario/login', async (req, res) => {
  const { email, password } = req.body;

  const match = await UsuarioService.login(email, password);

  switch (match) {
    case false:
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    case true:
      return res.status(404).json({ message: 'Usuario no encontrado' });
    default:
      return res.status(200).json({ message: 'Inicio de sesión exitoso', userId: match });
  }
});
module.exports = router;
