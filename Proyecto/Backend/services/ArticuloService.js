const GlobalService = require('./GlobalService');

class ArticuloService extends GlobalService {
  constructor() {
    super('Articulo');
  }
}

module.exports = ArticuloService;
