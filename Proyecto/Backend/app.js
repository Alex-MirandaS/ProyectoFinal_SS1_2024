//INICIALIZAMOS EL PROYECTO DE ESTA MANERA
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//RUTAS
const RolRoutes = require('./routes/RolRoutes');
const UsuarioRoutes = require('./routes/UsuarioRoutes');
const ProveedorRoutes = require('./routes/ProveedorRoutes');
const TipoArticuloRoutes = require('./routes/TipoArticuloRoutes');
const CategoriaRoutes = require('./routes/CategoriaRoutes');
const EstadoRoutes = require('./routes/EstadoRoutes');
const ArticuloRoutes = require('./routes/ArticuloRoutes');
const ArticuloCategoriaRoutes = require('./routes/ArticuloCategoriaRoutes');
const ShopBagRoutes = require('./routes/ShopBagRoutes');
const EstadoOrdenRoutes = require('./routes/EstadoOrdenRoutes');
const OrdenRoutes = require('./routes/OrdenRoutes');
const DetalleOrdenRoutes = require('./routes/DetalleOrdenRoutes');
const ReportesRoutes = require('./routes/ReportesRoutes');
const PublicRoutes = require('./routes/PublicRoutes');
const app = express();

app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use('/api', RolRoutes);
app.use('/api', UsuarioRoutes);
app.use('/api', ProveedorRoutes);
app.use('/api', TipoArticuloRoutes);
app.use('/api', CategoriaRoutes);
app.use('/api', EstadoRoutes);
app.use('/api', ArticuloRoutes);
app.use('/api', ArticuloCategoriaRoutes);
app.use('/api', ShopBagRoutes);
app.use('/api', EstadoOrdenRoutes);
app.use('/api', OrdenRoutes);
app.use('/api', DetalleOrdenRoutes);
app.use('/api', ReportesRoutes);
app.use('/mens-style/api/public', PublicRoutes);
app.listen(3000);
console.log('EL SERVIDOR SE INICIO EN EL PUERTO 3000');

//npm run dev