// models/User.js
const db = require('../db/db');

class Usuario {
  constructor(id, nombre, apellido, email, password, idRol) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.password = password;
    this.idRol = idRol;
  }
}

module.exports = Usuario;
