const GlobalService = require('./GlobalService');
const db = require('../db/db');

class OrdenService extends GlobalService {
  constructor() {
    super('Orden');
  }

  getById(typeId, id, callback) {
    const query = `SELECT * FROM Orden WHERE ${typeId} = ?`;
  
    db.query(query, [id], (err, result) => {
      if (err) throw err;
      callback(result);
    });
  }
}

module.exports = OrdenService;
