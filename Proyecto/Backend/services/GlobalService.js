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
            case 'Proveedores':
                return new Proveedores(null, data.nombre);
            case 'TipoArticulo':
                return new TipoArticulo(null, data.titulo);
            case 'Categoria':
                return new Categoria(null, data.categoria);
            case 'Estado':
                return new Estado(null, data.estado);
            case 'Articulo':
                return new Articulo(null, data.titulo, data.precio, data.imagen, data.descripcion, data.idEstado, data.idTipoArticulo, data.idUsuario, data.idProveedor);
            case 'ArticuloCategoria':
                return new ArticuloCategoria(data.idCategoria, data.idArticulo);
            case 'ShopBag':
                return new ShopBag(data.idUsuario, data.idArticulo, data.cantidad, data.seleccionado);
            case 'EstadoOrden':
                return new EstadoOrden(data.estado, data.descripcion);
            case 'Orden':
                return new Orden(null, data.idUsuario, data.total, data.idEstadoOrden);
            case 'DetalleOrden':
                return new DetalleOrden(data.idOrden, data.idProducto, data.cantidad)
        }
    }
}

module.exports = GlobalService;