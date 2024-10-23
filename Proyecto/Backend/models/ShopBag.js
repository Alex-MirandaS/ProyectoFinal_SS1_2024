const db = require('../db/db');

class ShopBag {
  constructor(idUsuario, idArticulo, cantidad, seleccionado) {
    this.idUsuario = idUsuario;
    this.idArticulo = idArticulo;
    this.cantidad = cantidad;
    this.seleccionado = seleccionado;
  }
}
module.exports = ShopBag;
