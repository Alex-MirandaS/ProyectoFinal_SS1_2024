const db = require('../db/db');
const fieldsArray = {
  Usuario: ['nombre', 'apellido', 'email', 'password', 'idRol','idPasarelaPago'],
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
  
/**
 * The function `create` inserts data into a specified table in a database using placeholders and
 * callback for error handling.
 * @param table - The `table` parameter in the `create` method represents the name of the database
 * table where you want to insert data.
 * @param data - The `data` parameter in the `create` method is an object containing the data to be
 * inserted into the specified table. Each key in the object corresponds to a field in the table, and
 * the value associated with each key is the data to be inserted into that field.
 * @param callback - The `callback` parameter in the `create` method is a function that is called once
 * the data insertion operation is completed. It is used to handle the result of the operation, such as
 * the inserted ID or any potential errors.
 */
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

/**
 * The `findById` function retrieves a record from a database table based on the provided ID.
 * @param table - The `table` parameter in the `findById` method represents the name of the database
 * table from which you want to retrieve data.
 * @param id - The `id` parameter in the `findById` method is the unique identifier used to search for
 * a specific record in the database table. It is typically a primary key that uniquely identifies a
 * row in the table.
 * @param callback - The `callback` parameter in the `findById` method is a function that will be
 * called once the database query is completed. It takes one argument, `result`, which is the data
 * retrieved from the database for the specified `id`. In this case, the callback function is
 * responsible for handling the retrieved
 */
    static findById(table, id, callback) {
      const query = `SELECT * FROM ${table} WHERE id = ?`;
    
      db.query(query, [id], (err, result) => {
        if (err) throw err;
        callback(result[0]);
      });
    }

/**
 * The function `getAll` retrieves all records from a specified database table and passes the results
 * to a callback function.
 * @param table - The `table` parameter in the `getAll` function represents the name of the table from
 * which you want to retrieve all records.
 * @param callback - The `callback` parameter in the `getAll` function is a function that will be
 * called once the database query is completed. It takes the `results` of the query as an argument and
 * typically contains the logic to handle or process the results in some way.
 */
    static getAll(table, callback) {
      const query = `SELECT * FROM ${table}`;
    
      db.query(query, (err, results) => {
        if (err) throw err;
        callback(results);
      });
    }
/**
 * The function `updateById` updates a specific column value in a table based on the provided ID using
 * a SQL query.
 * @param table - The `table` parameter represents the name of the table in the database that you want
 * to update.
 * @param id - The `id` parameter in the `updateById` function represents the unique identifier of the
 * row you want to update in the database table specified by the `table` parameter.
 * @param data - The `data` parameter in the `updateById` function represents the new value that you
 * want to update in the specified column (`columnName`) for the row with the given `id` in the
 * `table`.
 * @param columnName - The `columnName` parameter in the `updateById` function represents the name of
 * the column in the database table that you want to update with the new data value.
 * @param callback - The `callback` parameter in the `updateById` function is a function that will be
 * called once the database query is executed. It typically takes the `result` of the query as an
 * argument and can be used to handle the results of the database operation, such as sending a response
 * back to the
 */

    static updateById(table, id, data, columnName, callback) {
      const query = `UPDATE ${table} SET ${columnName} = ? WHERE id = ?`;
      const values = [data, id];
    
      db.query(query, values, (err, result) => {
        if (err) throw err;
        callback(result);
      });
    }
    
/* The `deleteById` function in the provided code snippet is responsible for deleting a record from a
specified table in the database based on the provided `id`. Here is a breakdown of what the function
does: */
    static deleteById(table, id, callback) {
      const query = `DELETE FROM ${table} WHERE id = ?`;
    
      db.query(query, [id], (err, result) => {
        if (err) throw err;
        callback(result);
      });
    }   
      
  }

  module.exports = Model;