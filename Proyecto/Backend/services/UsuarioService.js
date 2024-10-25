const bcrypt = require('bcrypt');
const GlobalService = require('./GlobalService');

class UsuarioService extends GlobalService {
  constructor() {
    super('Usuario');
  }

  async getHashedPassword(password) {
    try {
        // Genera el hash de la contraseña con bcrypt
        const saltRounds = 10; // Número de rondas para el "salting"
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error al encriptar la contraseña:', error);
    }
}
}

module.exports = UsuarioService;
