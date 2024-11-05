const GlobalService = require('./GlobalService');
const db = require('../db/db');

class ShopBagService extends GlobalService {
  constructor() {
    super('ShopBag');
  }

  create(data, callback) {
    const { idUsuario, idArticulo, cantidad, seleccionado } = data;

    // Consulta SQL para insertar un nuevo registro
    const sql = 'INSERT INTO ShopBag (idUsuario, idArticulo, cantidad, seleccionado) VALUES (?, ?, ?, ?)';
    const values = [idUsuario, idArticulo, cantidad, seleccionado];

    db.query(sql, values, (error, results) => {
      if (error) {
        if (error.code === 'ER_DUP_ENTRY') {
          console.log('Error Capturado');
          // Obtener el ID del artículo existente
          const sqlSelect = 'SELECT * FROM ShopBag WHERE idUsuario = ? AND idArticulo = ?';
          const valuesSelect = [idUsuario, idArticulo];
          db.query(sqlSelect, valuesSelect, (selectError, selectResults) => {
            if (selectError) {
              return callback({ message: 'Error al buscar el artículo.', status: 500 });
            }
            console.log(selectResults);

            if (selectResults.length > 0) {
              // Calcular la nueva cantidad
              const newCantidad = cantidad + selectResults[0].cantidad; // Aquí podrías sumar o modificar como necesites
              console.log('nuevaCantidad',newCantidad);

              const sqlUpdate = 'UPDATE ShopBag SET cantidad = ? WHERE idUsuario = ? AND idArticulo = ?';
              const valuesUpdate = [newCantidad, idUsuario, idArticulo];

              // Llamar directamente a la consulta de actualización
              db.query(sqlUpdate, valuesUpdate, (updateError, updateResults) => {
                  if (updateError) {
                      return callback({ message: 'Error al actualizar la cantidad.', status: 500 });
                  }
                  callback(null, selectResults[0].idArticulo); // Retornar el ID existente
              });

            } else {
              return callback({ message: 'No se encontró el artículo para actualizar.', status: 404 });
            }
          });
          return; // Salir de la función para no ejecutar el callback principal
        }
        // Manejo de otros errores
        return callback({ message: 'Error al insertar datos.', status: 500, error: error.sqlMessage });
      }

      // Si la inserción es exitosa
      callback(null, results.insertId); // Llama al callback sin error y pasa el ID insertado
    });
  }

  getById(onlySelected, idUsuario, callback) {
    let query = 'SELECT * FROM ShopBag WHERE idUsuario = ?';

    if (onlySelected) {
      query += ' AND seleccionado = true'
    }
    db.query(query, [idUsuario], (err, result) => {
      if (err) throw err;
      callback(result);
    });
  }

  delete(idUsuario, callback) {
    const query = 'DELETE FROM ShopBag WHERE idUsuario = ?';

    db.query(query, [idUsuario], (err, result) => {
      if (err) throw err;
      callback(result);
    });
  }

  deleteByIdArticulo(idUsuario, idArticulo, callback) {
    console.log(idArticulo, idUsuario);
    const query = 'DELETE FROM ShopBag WHERE idUsuario = ? AND idArticulo = ?';
    db.query(query, [idUsuario, idArticulo], (err, result) => {
      if (err) throw err;
      callback(result);
    });
  }

  getTotal(idUsuario, callback) {
    const query = 'SELECT sb.idUsuario, SUM(sb.cantidad * a.precio) AS total FROM ShopBag sb JOIN Articulo a ON sb.idArticulo = a.id WHERE sb.idUsuario = ? GROUP BY sb.idUsuario;';
    //agregar solamente articulos seleccionados
    db.query(query, [idUsuario], (err, result) => {
      if (err) throw err;
      callback(result);
    });
  }
}

module.exports = ShopBagService; 
