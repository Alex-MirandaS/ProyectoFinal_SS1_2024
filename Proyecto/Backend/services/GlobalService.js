// Importaciones de modelos
const Rol = require('../models/Rol');
const Usuario = require('../models/Usuario');
const Proveedores = require('../models/Proveedor');
const TipoArticulo = require('../models/TipoArticulo');
const Estado = require('../models/Estado');
const Articulo = require('../models/Articulo');
const Categoria = require('../models/Categoria');
const ArticuloCategoria = require('../models/ArticuloCategoria');
const ShopBag = require('../models/ShopBag');
const EstadoOrden = require('../models/EstadoOrden');
const Orden = require('../models/Orden');
const DetalleOrden = require('../models/DetalleOrden');
const Model = require('../controllers/ControlModels')

class GlobalService {

    constructor(table) {
        this.table = table;
    }

    create(data, callback) {
        const newObject = this.getObject(data);
        Model.create(this.table, newObject, callback);
    }

    getById(id, callback) {
        Model.findById(this.table, id, callback);
    }

    getAll(callback) {
        Model.getAll(this.table, callback);
    }

    updateById(id, data, columnName, callback) {
        Model.updateById(this.table, id, data, columnName, callback);
    }

    delete(id, callback) {
        Model.deleteById(this.table, id, callback);
    }

    getObject(data) {
        switch (this.table) {
            case 'Rol':
                return new Rol(null, data.rol);
            case 'Usuario':
                return new Usuario(null, data.nombre, data.apellido, data.username, data.password, data.idRol);
        }
    }
}

module.exports = GlobalService;