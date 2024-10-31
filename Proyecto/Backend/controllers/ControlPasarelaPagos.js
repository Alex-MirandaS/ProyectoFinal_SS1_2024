const https = require('https');
const urlPayDay = `https://api-pagos-krd2.onrender.com/api/usuario/public/`; //CARLOS 1
const urlPayFast = `https://currently-lenient-platypus.ngrok-free.app/api/usuario/public/`; //LUIS 2

function checkEmailExistence(email, idPasarelaPago) {
    return new Promise((resolve, reject) => {
        let url = "";
        if(idPasarelaPago == 1){
            url = urlPayDay + `existeEmail/${email}`;
        }else{
            url = urlPayFast + `existeEmail/${email}`;
        }
        https.get(url, (response) => {
            let data = '';

            // Recibir datos por partes
            response.on('data', (chunk) => {
                data += chunk;
            });

            // Al recibir todos los datos
            response.on('end', () => {
                try {
                    const result = JSON.parse(data);
                    resolve(result);
                } catch (error) {
                    reject(new Error('Error al parsear la respuesta de la API'));
                }
            });
        }).on('error', (error) => {
            reject(new Error('Error al hacer la solicitud a la API: ' + error.message));
        });
    });
}


module.exports = { checkEmailExistence };
