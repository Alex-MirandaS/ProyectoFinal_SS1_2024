const GlobalService = require('./GlobalService');
const db = require('../db/db');

class ArticuloCategoriaService extends GlobalService {
  constructor() {
    super('ArticuloCategoria');
  }

  getById(typeId, id, callback) {
    const query = `SELECT * FROM ArticuloCategoria WHERE ${typeId} = ?`;
  
    db.query(query, [id], (err, result) => {
      if (err) throw err;
      callback(result);
    });
  }

  delete(idArticulo, callback) {
    const query = 'DELETE FROM ArticuloCategoria WHERE idArticulo = ?';
  
    db.query(query, [idArticulo], (err, result) => {
      if (err) throw err;
      callback(result);
    });
  } 

}

module.exports = ArticuloCategoriaService;
