const https = require('https');
const urlPayDay = `https://api-pagos-krd2.onrender.com`; //CARLOS 1
const urlPayFast = `https://currently-lenient-platypus.ngrok-free.app`; //LUIS 2

function checkEmailExistence(email, idPasarelaPago) {
    return new Promise((resolve, reject) => {
        let url = "";
        if(idPasarelaPago == 1){
            url = urlPayDay + `/api/usuario/public/existeEmail/${email}`;
        }else{
            url = urlPayFast + `/api/usuario/public/existeEmail/${email}`;
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
                    console.log(data);
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


function loginUser(email, password, idPasarelaPago) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({ email: email, password: password });
        let hostname = "";
        if (idPasarelaPago == 1) {
            hostname = 'api-pagos-krd2.onrender.com';  // Solo el dominio
        } else {
            hostname = 'currently-lenient-platypus.ngrok-free.app';  // Cambia según tu necesidad
        }
        const options = {
            hostname: hostname,
            port: 443,
            path: '/api/usuario/public/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = https.request(options, (res) => {
            let responseData = '';

            res.on('data', (chunk) => {
                responseData += chunk;
            });

            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(responseData);
                    if (parsedData.jwt) {
                        resolve(parsedData.jwt);  // Resuelve con el token JWT
                    } else {
                        reject(new Error("No se recibió JWT en la respuesta"));
                    }
                } catch (error) {
                    reject(new Error("Error al parsear la respuesta: " + error.message));
                }
            });
        });

        req.on('error', (error) => {
            reject(new Error("Error en la solicitud: " + error.message));
        });

        req.write(data);
        req.end();
    });
}


module.exports = { checkEmailExistence, loginUser };
