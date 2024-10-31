const db = require('../db/db');

class ReportesService {

  getReporte(idReporte, callback) {
    const query = this.getQuery(idReporte);
    db.query(query, (err, results) => {
      if (err) throw err;
      callback(results);
    });
  }

  getQuery(idReporte) {
    switch (idReporte) {
      case "1":
        return 'SELECT A.id, A.titulo, A.precio, E.estado, TA.titulo AS tipo_articulo, P.nombre AS proveedor FROM Articulo A INNER JOIN Estado E ON A.idEstado = E.id INNER JOIN TipoArticulo TA ON A.idTipoArticulo = TA.id INNER JOIN Proveedores P ON A.idProveedor = P.id WHERE A.idEstado IN (SELECT id FROM Estado WHERE  id =  A.idEstado );';
      case '2':
        return 'SELECT id, nombre, apellido, email, (SELECT rol FROM Rol WHERE id = idRol) AS rol FROM Usuario;';
      case '3':
        return 'SELECT A.titulo AS producto, C.categoria, P.nombre AS proveedor, SUM(DO.cantidad) AS total_vendido FROM DetalleOrden DO INNER JOIN Articulo A ON DO.idProducto = A.id INNER JOIN ArticuloCategoria AC ON A.id = AC.idArticulo INNER JOIN Categoria C ON AC.idCategoria = C.id INNER JOIN Proveedores P ON A.idProveedor = P.id GROUP BY A.titulo, C.categoria, P.nombre;';
      case '4':
        return 'SELECT A.titulo AS producto, SUM(DO.cantidad) AS total_vendido FROM DetalleOrden DO INNER JOIN Articulo A ON DO.idProducto = A.id GROUP BY A.titulo HAVING total_vendido > (SELECT AVG(cantidad) FROM DetalleOrden);';
      case '5':
        return 'SELECT SUM(total) AS saldo_total_ventas FROM Orden WHERE idEstadoOrden = (SELECT id FROM EstadoOrden WHERE estado = \'Aprobado\');';
      case '6':
        return 'SELECT O.id AS id_orden, U.nombre AS usuario, EO.estado, EO.descripcion FROM Orden O INNER JOIN Usuario U ON O.idUsuario = U.id INNER JOIN EstadoOrden EO ON O.idEstadoOrden = EO.id WHERE EO.estado LIKE \'Cancelado%\';';
      case '7':
        return 'SELECT U.nombre, U.apellido, R.rol AS nombre_rol FROM Usuario U INNER JOIN Rol R ON U.idRol = R.id WHERE U.idRol = 1;';
    }
  }
}

module.exports = ReportesService;
