const db = require('../db/db');

class EstadoOrden {
  constructor(id, estado) {
    this.id = id;
    this.estado = estado;
  }
}
module.exports = EstadoOrden;
