const bcrypt = require('bcrypt');

async function loginUser(username, plainPassword) {
    const query = 'SELECT password FROM Usuario WHERE username = ?';

    connection.query(query, [username], async (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            const hashedPassword = results[0].password;

            // Comparar la contraseña ingresada con la almacenada
            const match = await bcrypt.compare(plainPassword, hashedPassword);
            if (match) {
                console.log('Inicio de sesión exitoso');
            } else {
                console.log('Contraseña incorrecta');
            }
        } else {
            console.log('Usuario no encontrado');
        }
    });
}

module.exports = {
    loginUser
};
