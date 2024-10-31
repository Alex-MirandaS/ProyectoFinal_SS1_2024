const express = require('express');
const router = express.Router();

// Obtener información de la web
router.get('/company', (req, res) => {
  const companyInfo = {
    id: 1,
    name: 'Men\'s Style',
    email: 'mensstyle@gmail.com',
    address: 'Calle Rodolfo Robles, Calle 24 a, 0-27 zona 1, Quetzaltenango',
    image: 'https://img.freepik.com/premium-vector/man-clothing-store-logo_752850-817.jpg?semt=ais_hybrid',
  };
    res.json(companyInfo);
});
//RUTA: https://closing-tolerant-cockatoo.ngrok-free.app/mens-style/api/public/company
router.get('/company/:id', (req, res) => {
  const { id } = req.params; // Obtiene el ID de los parámetros de la ruta
  return res.status(404).json({
    message: 'Cannot GET/mens-style/api/public/company',
    error: 'Not Found',
    statusCode: 404
  });
});
module.exports = router;
