const GlobalService = require('./GlobalService');

class TipoArticuloService extends GlobalService {
  constructor() {
    super('TipoArticulo');
  }
}

module.exports = TipoArticuloService;
