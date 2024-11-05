const https = require('https');
const urlPayDay = `https://api-pagos-krd2.onrender.com`; //CARLOS 1
const urlPayFast = `https://currently-lenient-platypus.ngrok-free.app`; //LUIS 2

/**
 * The function `checkEmailExistence` sends a request to a specified API endpoint to check if a given
 * email exists in the system.
 * @param email - The `email` parameter is a string representing the email address that you want to
 * check for existence in a payment gateway system.
 * @param idPasarelaPago - The `idPasarelaPago` parameter is used to determine which payment gateway to
 * use for checking the existence of an email. If `idPasarelaPago` is equal to 1, the function will use
 * the `urlPayDay` payment gateway URL to make the API request. Otherwise
 * @returns A Promise is being returned from the `checkEmailExistence` function.
 */
function checkEmailExistence(email, idPasarelaPago) {
    return new Promise((resolve, reject) => {
        let url = "";
        if (idPasarelaPago == 1) {
            url = urlPayDay + `/api/usuario/public/existeEmail/${email}`;
        } else {
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
        let hostname = idPasarelaPago == 1 ? 'api-pagos-krd2.onrender.com' : 'currently-lenient-platypus.ngrok-free.app';

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
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    // Respuesta exitosa
                    try {
                        const parsedData = JSON.parse(responseData);
                        if (parsedData.jwt) {
                            resolve(parsedData.jwt);
                        } else {
                            reject({ message: "No se recibió JWT en la respuesta", statusCode: 400 });
                        }
                    } catch (error) {
                        reject({ message: "Error al parsear la respuesta: " + error.message, statusCode: 500 });
                    }
                } else {
                    // Manejar los códigos de estado diferentes a 2xx
                    let errorMsg;
                    try {
                        errorMsg = JSON.parse(responseData).message || responseData; // Intenta obtener un mensaje específico
                    } catch (e) {
                        errorMsg = responseData; // Si no es un JSON, usa el texto como está
                    }
                    reject({ message: `${errorMsg}`, statusCode: res.statusCode });
                }
            });
        });

        req.on('error', (error) => {
            reject({ message: "Error en la solicitud: " + error.message, statusCode: 500 });
        });

        req.write(data);
        req.end();
    });
}

function pagarGetComprobante(cantidad, correoReceptor, concepto, nombreTienda, identificadorTienda, jwt, idPasarelaPago) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            cantidad: Number(cantidad),
            correoReceptor: correoReceptor,
            concepto: concepto,
            nombreTienda: nombreTienda,
            identificadorTienda: identificadorTienda
        });

        let hostname = "";
        if (idPasarelaPago === 1) {
            hostname = 'api-pagos-krd2.onrender.com'; // Solo el dominio
        } else {
            hostname = 'currently-lenient-platypus.ngrok-free.app'; // Otro dominio según necesidad
        }

        const options = {
            hostname: hostname,
            port: 443,
            path: '/api/transaccion/protected/pagarGetComprobante',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                'Authorization': `Bearer ${jwt.jwt}` // Agregar el token JWT en el encabezado
            }
        };
        console.log(data);
        const req = https.request(options, (res) => {
            const chunks = [];

            // Manejar el código de estado
            if (res.statusCode >= 200 && res.statusCode < 300) {
                // Si la respuesta es exitosa, acumulamos los datos
                res.on('data', (chunk) => {
                    chunks.push(chunk); // Acumula los datos recibidos
                });

                res.on('end', () => {
                    const buffer = Buffer.concat(chunks); // Combina todos los chunks en un solo Buffer
                    resolve(buffer); // Resuelve con el Buffer que representa el PDF
                });
            } else {
                // Rechazar la promesa con el código de estado y un mensaje
                reject({
                    statusCode: res.statusCode,
                    message: `Error HTTP ${res.statusCode}: ${res.statusMessage}`
                });
            }
        });

        req.on('error', (error) => {
            reject(new Error("Error en la solicitud: " + error.message));
        });

        req.write(data);
        req.end();
    });
}

module.exports = { checkEmailExistence, loginUser, pagarGetComprobante };
