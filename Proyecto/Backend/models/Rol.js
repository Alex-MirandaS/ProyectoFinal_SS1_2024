const db = require('../db/db');

class Rol {
  constructor(id, rol) {
    this.id = id;
    this.rol = rol;
  }
}

module.exports = Rol;
