const GlobalService = require('./GlobalService');

class UsuarioService extends GlobalService {
  constructor() {
    super('Usuario');
  }
}

module.exports = UsuarioService;
