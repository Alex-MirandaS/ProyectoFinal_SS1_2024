const bcrypt = require('bcrypt');
const GlobalService = require('./GlobalService');
const db = require('../db/db');
const { resolve } = require('path');

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

  login(email, plainPassword) {
    const query = 'SELECT * FROM Usuario WHERE email = ?';

    return new Promise((resolve, reject) => {
      db.query(query, [email], async (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
          const hashedPassword = results[0].password;

          const match = await bcrypt.compare(plainPassword, hashedPassword);
          if (match) {
            resolve(results[0]);
          } else {
            resolve(false);
          }
        } else {
          resolve(true);
        }
      });
    });
  }

  getIdPasarelaPagoById(id) {
    const query = 'SELECT idPasarelaPago FROM Usuario WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [id], async (err, results) => {
        if (err) throw err;
        resolve(results);
      });
    });
  }
}

module.exports = UsuarioService;
