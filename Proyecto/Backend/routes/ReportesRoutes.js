const express = require('express');
const router = express.Router();
const ReportesS = require('../services/ReportesService');
const ReportesService = new ReportesS();
const OrdenS = require('../services/OrdenService');
const OrdenService = new OrdenS();
const ShopBagS = require('../services/ShopBagService');
const ShopBagService = new ShopBagS();
const UsuarioS = require('../services/UsuarioService');
const UsuarioService = new UsuarioS();
const DetalleOrdenS = require('../services/DetalleOrdenService');
const DetalleOrdenService = new DetalleOrdenS();
const { loginUser, pagarGetComprobante } = require('../controllers/ControlPasarelaPagos');
// Obtener Reporte por ID
router.get('/reporte/:id', async (req, res) => {
  const { id } = req.params;
  ReportesService.getReporte('' + id, (reporte) => {
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
      res.json({ jwt });
    })
    .catch(error => {
      console.error("Error:", error.message);

      switch (error.statusCode) {
        case 400:
          res.status(400).json({ message: error.message || 'Solicitud incorrecta, Algún campo es inválido o falta información' });
          break;
        case 401:
          res.status(401).json({ message: error.message || "Credenciales inválidas, el Usuario no está autorizado" });
          break;
        case 404:
          res.status(404).json({ message: error.message || "El correo electrónico no fue encontrado" });
          break;
        case 500:
          res.status(500).json({ message: error.message || "Error interno del servidor" });
          break;
        default:
          res.status(500).json({ message: "Error desconocido" });
      }
    });
});

router.post('/reporte/pagarGetComprobante', async (req, res) => {

  //DATOS DEL COMPROBANTE
  let correoReceptor = "mensstyle@gmail.com";
  let concepto = "Pago por Compra Online XD";
  let nombreTienda = "Mens Style";
  let identificadorTienda = "b";
  let cantidad = 0;
  let idPasarelaPago = 0;
  let idEstadoOrden = 1;
  let idOrden = 0;

  const { idUsuario, jwt } = req.body;
  //Obtener el total del ShopBag
  ShopBagService.getTotal(idUsuario, (total) => {
    cantidad = total[0].total;
  });
  //Obtener el idPasarelaPago
  idPasarelaPago = await UsuarioService.getIdPasarelaPagoById(idUsuario);

  console.log(cantidad);
  //Creamos la Orden

  OrdenService.create({ idUsuario, total: cantidad, idEstadoOrden }, (insertedId) => {

    idOrden = insertedId;
    //
    let shopBagArticulos = [];
    ShopBagService.getById(false, idUsuario, (shopBag) => {
      shopBagArticulos = shopBag;
      //AGREGAMOS LOS OBJETOS DEL SHOPBAG AL DETALLE ORDEN
      for (let articulo of shopBagArticulos) {
        DetalleOrdenService.create({ idOrden, idProducto: articulo.idArticulo, cantidad: articulo.cantidad }, (insertedId) => {
          console.log('DetalleOrden creado con éxito');
          //BORRAMOS EL SHOPBAG
          ShopBagService.delete(idUsuario, (result) => {
            if (result.affectedRows > 0) {
              console.log('ShopBag eliminados con éxito');
            } else {
              console.log('ERROR');
            }
          });
        });
      }
    });

  });
console.log('IMPRIMIR ANTES DEL PAGARGETCOMPROBANTE')
  pagarGetComprobante(cantidad, correoReceptor, concepto, nombreTienda, identificadorTienda, jwt, idPasarelaPago[0].idPasarelaPago)
    .then(comprobante => {
      if (comprobante != null) {
        
        console.log('Descuento Realizado', comprobante);
        //CREAR ORDEN
        /*
        let data = {
          idUsuario: idUsuario,
          total: cantidad,
          idEstadoOrden: 1
        }
        OrdenService.create({ idUsuario, total, idEstadoOrden }, (insertedId) => {
          if (insertedId) {
            res.json({ message: 'Orden creada con éxito', id: insertedId });
          } else {
            res.status(500).json({ message: 'Error al crear la Orden' });
          }
        });
        console.log("Devolviendo el PDF COMPROBANTE");
        res.json(comprobante);*/
      } else {

      }
    })
    .catch(error => {
      res.status(404).json({ message: 'Error encontrado' });
      console.error("Error:", error.message);
    });
});

module.exports = router;
