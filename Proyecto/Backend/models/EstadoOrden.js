const db = require('../db/db');

class EstadoOrden {
  constructor(id, estado, descripcion) {
    this.id = id;
    this.estado = estado;
    this.descripcion = descripcion;
  }
}
module.exports = EstadoOrden;
