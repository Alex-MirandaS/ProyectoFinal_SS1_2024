const db = require('../db/db');

class DetalleOrden {
  constructor(idOrden, idProducto, cantidad) {
    this.idOrden = idOrden;
    this.idProducto = idProducto;
    this.cantidad = cantidad;
  }
}

module.exports = DetalleOrden;
