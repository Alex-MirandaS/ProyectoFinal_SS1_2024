const db = require('../db/db');

class Orden {
  constructor(id, idUsuario, total, idEstadoOrden) {
    this.id = id;
    this.idUsuario = idUsuario;
    this.total = total;
    this.idEstadoOrden = idEstadoOrden;
  }
}

module.exports = Orden;
