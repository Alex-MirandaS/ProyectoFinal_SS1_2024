const db = require('../db/db');

class Orden {
  constructor(id, idUsuario, fecha, total, idEstadoOrden) {
    this.id = id;
    this.idUsuario = idUsuario;
    this.fecha = fecha;
    this.total = total;
    this.idEstadoOrden = idEstadoOrden;
  }
}

module.exports = Orden;
