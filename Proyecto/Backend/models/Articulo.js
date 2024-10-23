const db = require('../db/db');

class Articulo {
  constructor(id, titulo, precio, imagen, descripcion, idEstado, idTipoArticulo, idUsuario, idProveedor) {
    this.id = id;
    this.titulo = titulo;
    this.precio = precio;
    this.imagen = imagen;
    this.descripcion = descripcion;
    this.idEstado = idEstado;
    this.idTipoArticulo = idTipoArticulo;
    this.idUsuario = idUsuario;
    this.idProveedor = idProveedor;
  }
}
module.exports = Articulo;
