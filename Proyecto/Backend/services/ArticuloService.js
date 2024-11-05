const GlobalService = require('./GlobalService');
const db = require('../db/db');

class ArticuloService extends GlobalService {
  constructor() {
    super('Articulo');
  }

}

module.exports = ArticuloService;
