const db = require('../db/db');

class Categoria {
  constructor(id, categoria) {
    this.id = id;
    this.categoria = categoria;
  }
}

module.exports = Categoria;
