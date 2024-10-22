const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Di mi nombre9', // Dejar vacío ya que no se requiere contraseña
    database: 'mens_style' // Reemplaza con el nombre de tu base de datos
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL como root.');
});

module.exports = connection;