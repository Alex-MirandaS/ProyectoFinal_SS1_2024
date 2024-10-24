const GlobalService = require('./GlobalService');
const db = require('../db/db');

class DetalleOrdenService extends GlobalService {
  constructor() {
    super('DetalleOrden');
  }

  getById(idOrden, callback) {
    let query = 'SELECT * FROM DetalleOrden WHERE idOrden = ?';

    db.query(query, [idOrden], (err, result) => {
      if (err) throw err;
      callback(result);
    });
  }

  delete(idOrden, callback) {
    const query = 'DELETE FROM DetalleOrden WHERE idOrden = ?';
  
    db.query(query, [idOrden], (err, result) => {
      if (err) throw err;
      callback(result);
    });
  } 
}

module.exports = DetalleOrdenService;
