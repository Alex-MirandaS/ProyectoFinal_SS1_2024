const express = require('express');
const router = express.Router();
const ReportesS = require('../services/ReportesService');
const ReportesService = new ReportesS();
const { loginUser } = require('../controllers/ControlPasarelaPagos');
// Obtener Reporte por ID
router.get('/reporte/:id', async (req, res) => {
  const { id } = req.params;
  ReportesService.getReporte(''+id, (reporte) => {
    if (reporte) {
      res.json(reporte);
    } else {
      res.status(404).json({ message: 'Reporte no encontrado' });
    }
  });
});

router.post('/reporte/loginPasarela', (req, res) => {
  const { email, password, idPasarelaPago } = req.body;
  loginUser(email, password, idPasarelaPago)
    .then(jwt => {
        console.log("Token JWT:", jwt);
        res.json(jwt);
    })
    .catch(error => {
        console.error("Error:", error.message);
    });
});

module.exports = router;
