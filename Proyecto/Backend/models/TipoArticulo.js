const db = require('../db/db');

class TipoArticulo {
  constructor(id, titulo) {
    this.id = id;
    this.titulo = titulo;
  }
}

module.exports = TipoArticulo;
