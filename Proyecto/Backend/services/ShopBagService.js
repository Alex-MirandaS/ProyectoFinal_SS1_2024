const GlobalService = require('./GlobalService');
const db = require('../db/db');

class ShopBagService extends GlobalService {
  constructor() {
    super('ShopBag');
  }

  getById(onlySelected, idUsuario, callback) {
    let query = 'SELECT * FROM ShopBag WHERE idUsuario = ?';
  
    if(onlySelected){
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
