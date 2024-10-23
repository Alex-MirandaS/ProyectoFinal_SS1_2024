const db = require('../db/db');

class Proveedores {
  constructor(id, nombre) {
    this.id = id;
    this.nombre = nombre;
  }
}

module.exports = Proveedores;
