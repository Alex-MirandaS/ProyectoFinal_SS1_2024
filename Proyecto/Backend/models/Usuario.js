// models/User.js
const db = require('../db/db');

class Usuario {
  constructor(id, nombre, apellido, username, password, idRol) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.username = username;
    this.password = password;
    this.idRol = idRol;
  }
}

module.exports = Usuario;
