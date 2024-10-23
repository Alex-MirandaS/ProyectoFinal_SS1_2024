const db = require('../db/db');

class Estado {
  constructor(id, estado) {
    this.id = id;
    this.estado = estado;
  }
}

module.exports = Estado;
