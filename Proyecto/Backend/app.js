//INICIALIZAMOS EL PROYECTO DE ESTA MANERA
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//RUTAS
const RolRoutes = require('./routes/RolRoutes');
const UsuarioRoutes = require('./routes/UsuarioRoutes');

const app = express();

app.use(express.json());
app.use(cors());
/*EJEMPLO:
app.get('/api/datos', (req, res) => {
    connection.query('SELECT * FROM Rol', (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener datos de la base de datos' });
      }
      res.json(results); // Enviar los resultados como respuesta
    });
  });
*/
app.use(bodyParser.json());
app.use('/api', RolRoutes);
app.use('/api', UsuarioRoutes);
app.listen(3000);
console.log('EL SERVIDOR SE INICIO EN EL PUERTO 3000');

//npm run dev