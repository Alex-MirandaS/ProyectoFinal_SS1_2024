const db = require('../db/db');

class ArticuloCategoria {
  constructor(idCategoria, idArticulo) {
    this.idCategoria = idCategoria;
    this.idArticulo = idArticulo;
  }
}
module.exports = ArticuloCategoria;
