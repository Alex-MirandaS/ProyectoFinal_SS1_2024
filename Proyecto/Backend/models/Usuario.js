// models/User.js
const db = require('../db/db');

class Usuario {
  constructor(id, nombre, apellido, email, password, idRol, idPasarelaPago) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.password = password;
    this.idRol = idRol;
    this.idPasarelaPago = idPasarelaPago;
  }
}

module.exports = Usuario;
