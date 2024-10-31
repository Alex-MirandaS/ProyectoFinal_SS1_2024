const db = require('../db/db');
const fieldsArray = {
  Usuario: ['nombre', 'apellido', 'email', 'password', 'idRol'],
  Rol: ['rol'],
  Proveedores: ['nombre'],
  TipoArticulo: ['titulo'],
  Estado: ['estado'],
  Articulo: ['titulo', 'precio', 'imagen', 'descripcion', 'idEstado', 'idTipoArticulo', 'idUsuario', 'idProveedor'],
  Categoria: ['categoria'],
  ArticuloCategoria: ['idCategoria', 'idArticulo'],
  ShopBag: ['idUsuario', 'idArticulo', 'cantidad', 'seleccionado'],
  EstadoOrden: ['estado', 'descripcion'],
  Orden: ['idUsuario', 'total', 'idEstadoOrden'],
  DetalleOrden: ['idOrden', 'idProducto', 'cantidad']
};

  class Model {
  
    static create(table, data, callback) {
        const fields = fieldsArray[table].join(', ');
        const placeholders = fieldsArray[table].map(() => '?').join(', ');
      
        const query = `INSERT INTO ${table} (${fields}) VALUES (${placeholders})`;
      
        const values = fieldsArray[table].map(field => data[field]);
      
        db.query(query, values, (err, result) => {
          if (err) {
            console.error('Error inserting data:', err);
            return callback(null); 
        }
        const insertedId = result.insertId || null;
        callback(insertedId);
        });
    }

    static findById(table, id, callback) {
      const query = `SELECT * FROM ${table} WHERE id = ?`;
    
      db.query(query, [id], (err, result) => {
        if (err) throw err;
        callback(result[0]);
      });
    }

    static getAll(table, callback) {
      const query = `SELECT * FROM ${table}`;
    
      db.query(query, (err, results) => {
        if (err) throw err;
        callback(results);
      });
    }

    static updateById(table, id, data, columnName, callback) {
      const query = `UPDATE ${table} SET ${columnName} = ? WHERE id = ?`;
      const values = [data, id];
    
      db.query(query, values, (err, result) => {
        if (err) throw err;
        callback(result);
      });
    }
    
    static deleteById(table, id, callback) {
      const query = `DELETE FROM ${table} WHERE id = ?`;
    
      db.query(query, [id], (err, result) => {
        if (err) throw err;
        callback(result);
      });
    }   
      
  }

  module.exports = Model;