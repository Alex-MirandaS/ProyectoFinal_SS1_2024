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
    idPasarelaPago INT NOT NULL,
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

INSERT INTO Orden (idUsuario, total, idEstadoOrden)
VALUES (6, 5450.00, 1); 

INSERT INTO DetalleOrden (idOrden, idProducto, cantidad)
VALUES (LAST_INSERT_ID(), 1, 1); 

INSERT INTO Orden (idUsuario, total, idEstadoOrden)
VALUES (6, 10900, 2); 

INSERT INTO DetalleOrden (idOrden, idProducto, cantidad)
VALUES (LAST_INSERT_ID(), 1, 2);

INSERT INTO Usuario (nombre, apellido, email, password, idRol) VALUES ('Mens-Style', 'Admin', 'mensstyle@gmail.com', 'M3N55TYL3', 1);

/*REPORTE 1/EXISTENCIAS*/
SELECT A.id, A.titulo, A.precio, E.estado, TA.titulo AS tipo_articulo, P.nombre AS proveedor
FROM Articulo A
INNER JOIN Estado E ON A.idEstado = E.id
INNER JOIN TipoArticulo TA ON A.idTipoArticulo = TA.id
INNER JOIN Proveedores P ON A.idProveedor = P.id
WHERE A.idEstado IN (SELECT id FROM Estado WHERE  id =  A.idEstado );
/*REPORTE 2/USUARIOS*/
SELECT id, nombre, apellido, email, (SELECT rol FROM Rol WHERE id = idRol) AS rol
FROM Usuario;
/*REPORTE 3/ Productos Vendidos*/
SELECT A.titulo AS producto, C.categoria, P.nombre AS proveedor, SUM(DO.cantidad) AS total_vendido
FROM DetalleOrden DO
INNER JOIN Articulo A ON DO.idProducto = A.id
INNER JOIN ArticuloCategoria AC ON A.id = AC.idArticulo
INNER JOIN Categoria C ON AC.idCategoria = C.id
INNER JOIN Proveedores P ON A.idProveedor = P.id
GROUP BY A.titulo, C.categoria, P.nombre;
/*REPORTE 4/ Productos Vendidos*/
SELECT A.titulo AS producto, SUM(DO.cantidad) AS total_vendido
FROM DetalleOrden DO
INNER JOIN Articulo A ON DO.idProducto = A.id
GROUP BY A.titulo
HAVING total_vendido > (SELECT AVG(cantidad) FROM DetalleOrden);
/*REPORTE 5/ Reporte General de Ventas*/
SELECT SUM(total) AS saldo_total_ventas
FROM Orden
WHERE idEstadoOrden = (SELECT id FROM EstadoOrden WHERE estado = 'Aprobado');
/*REPORTE 6/ Reporte de Errores*/
SELECT O.id AS id_orden, U.nombre AS usuario, EO.estado, EO.descripcion
FROM Orden O
INNER JOIN Usuario U ON O.idUsuario = U.id
INNER JOIN EstadoOrden EO ON O.idEstadoOrden = EO.id
WHERE EO.estado LIKE 'Cancelado%';
/*REPORTE 7/ Reporte de Empleados*/
SELECT U.nombre, U.apellido, R.rol AS nombre_rol
FROM Usuario U
INNER JOIN Rol R ON U.idRol = R.id
WHERE U.idRol = 1;

