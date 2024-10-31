-- Creación de la base de datos
CREATE DATABASE mens_style;
USE mens_style;

-- Tabla Rol
CREATE TABLE Rol (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rol VARCHAR(50) NOT NULL
);

-- Tabla Usuario
CREATE TABLE Usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    idRol INT NOT NULL,
    FOREIGN KEY (idRol) REFERENCES Rol(id)
);

-- Tabla Proveedores
CREATE TABLE Proveedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla TipoArticulo
CREATE TABLE TipoArticulo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(50) NOT NULL
);

-- Tabla Estado
CREATE TABLE Estado (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estado VARCHAR(50) NOT NULL
);

-- Tabla Artículo
CREATE TABLE Articulo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    imagen LONGBLOB,
    descripcion TEXT,
    idEstado INT NOT NULL,
    idTipoArticulo INT NOT NULL,
    idUsuario INT NOT NULL,
    idProveedor INT NOT NULL,
    FOREIGN KEY (idEstado) REFERENCES Estado(id),
    FOREIGN KEY (idTipoArticulo) REFERENCES TipoArticulo(id),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id),
    FOREIGN KEY (idProveedor) REFERENCES Proveedores(id)
);

-- Tabla Categoria
CREATE TABLE Categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria VARCHAR(50) NOT NULL
);

-- Tabla ArtículoCategoría
CREATE TABLE ArticuloCategoria (
    idCategoria INT NOT NULL,
    idArticulo INT NOT NULL,
    PRIMARY KEY (idCategoria, idArticulo),
    FOREIGN KEY (idCategoria) REFERENCES Categoria(id),
    FOREIGN KEY (idArticulo) REFERENCES Articulo(id)
);

-- Tabla ShopBag (Carrito de compras)
CREATE TABLE ShopBag (
    idUsuario INT NOT NULL,
    idArticulo INT NOT NULL,
    cantidad INT NOT NULL,
    seleccionado BOOLEAN,
    PRIMARY KEY (idUsuario, idArticulo),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id),
    FOREIGN KEY (idArticulo) REFERENCES Articulo(id)
);

-- Tabla EstadoOrden
CREATE TABLE EstadoOrden (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estado VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL
);

-- Tabla Orden
CREATE TABLE Orden (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idUsuario INT NOT NULL,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    idEstadoOrden INT NOT NULL,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id),
    FOREIGN KEY (idEstadoOrden) REFERENCES EstadoOrden(id)
);

-- Tabla DetalleOrden
CREATE TABLE DetalleOrden (
    idOrden INT NOT NULL,
    idProducto INT NOT NULL,
    cantidad INT NOT NULL,
    PRIMARY KEY (idOrden, idProducto),
    FOREIGN KEY (idOrden) REFERENCES Orden(id),
    FOREIGN KEY (idProducto) REFERENCES Articulo(id)
);

-- Datos Iniciales 
INSERT INTO Rol (rol) VALUES ('Admin'), ('Cliente');

INSERT INTO Estado (estado) VALUES ('NUEVO'), ('USADO - Como Nuevo'), ('USADO - Buen estado'), ('USADO - aceptable');

INSERT INTO TipoArticulo (titulo) VALUES ('Producto'), ('Servicio');

INSERT INTO Proveedores (nombre) VALUES ('Apple');
INSERT INTO Proveedores (nombre) VALUES ('Samsung');
INSERT INTO Proveedores (nombre) VALUES ('Sony');
INSERT INTO Proveedores (nombre) VALUES ('Microsoft');
INSERT INTO Proveedores (nombre) VALUES ('Intel');
INSERT INTO Proveedores (nombre) VALUES ('LG');
INSERT INTO Proveedores (nombre) VALUES ('Dell');
INSERT INTO Proveedores (nombre) VALUES ('HP');
INSERT INTO Proveedores (nombre) VALUES ('Lenovo');
INSERT INTO Proveedores (nombre) VALUES ('Asus');

INSERT INTO Categoria (categoria) VALUES ('Electrónica');
INSERT INTO Categoria (categoria) VALUES ('Ropa');
INSERT INTO Categoria (categoria) VALUES ('Alimentos');
INSERT INTO Categoria (categoria) VALUES ('Muebles');
INSERT INTO Categoria (categoria) VALUES ('Juguetes');
INSERT INTO Categoria (categoria) VALUES ('Automóviles');
INSERT INTO Categoria (categoria) VALUES ('Libros');
INSERT INTO Categoria (categoria) VALUES ('Software');
INSERT INTO Categoria (categoria) VALUES ('Deportes');
INSERT INTO Categoria (categoria) VALUES ('Jardinería');

INSERT INTO EstadoOrden (estado, descripcion) VALUES ('Aprobado', 'La orden se ha aprobado correctamente');
INSERT INTO EstadoOrden (estado, descripcion) VALUES ('Cancelado por falta de fondos', 'La orden fue cancelada debido a la falta de fondos suficientes ');
INSERT INTO EstadoOrden (estado, descripcion) VALUES ('Cancelado por solicitud del cliente', 'El cliente ha solicitado la cancelación de la orden');
INSERT INTO EstadoOrden (estado, descripcion) VALUES ('En proceso', 'La orden está siendo procesada por el sistema y se encuentra en progreso ');

INSERT INTO Usuario (nombre, apellido, email, password, idRol) VALUES ('Admin', 'Admin', 'mensstyle@gmail.com', 'M3N55TYL3', 1);
