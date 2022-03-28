CREATE DATABASE proyectos;

use proyectos;

CREATE TABLE empleado (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido_paterno VARCHAR(255) NOT NULL,
    apellido_materno VARCHAR (255) NOT NULL, 
    numero_empleado INT NOT NULL ,
    puesto VARCHAR (255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR (255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE proyecto (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    fecha_inicio VARCHAR(255),
    fecha_fin VARCHAR(255),
    descripcion TEXT,
    materiales VARCHAR (255),
    trabajadores INT,
    creador INT,
    tareas_totales INT, 
    tareas_pendientes INT, 
    tareas_terminadas INT, 
    FOREIGN KEY (trabajadores) REFERENCES empleado (id)
);

CREATE TABLE tareas (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_proyecto INT NOT NULL, 
    descripcion TEXT,
    trabajo INT, 
    fecha TIMESTAMP, 
    FOREIGN KEY (id_proyecto) REFERENCES proyecto (id),
    FOREIGN KEY (trabajo) REFERENCES empleado (id)
);

CREATE TABLE herramienta (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    nombre VARCHAR(255) NOT NULL,
    marca VARCHAR(255) NOT NULL, 
    codigo VARCHAR (255) NOT NULL,
    portador INT, 
    FOREIGN KEY (portador) REFERENCES empleado (id)
);

CREATE TABLE materiales (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    descripcion VARCHAR(255),
    proveedor VARCHAR (255), 
    cantidad INT, 
    oc VARCHAR (255),
    fecha_ingreso VARCHAR(255)
);

CREATE TABLE salidas (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    descripcion VARCHAR (255), 
    cantidad INT, 
    id_material INT, 
    fecha_salida VARCHAR(255),
    entregado INT, 
    FOREIGN KEY (id_material) REFERENCES materiales (id),
    FOREIGN KEY (entregado) REFERENCES empleado (id)
);