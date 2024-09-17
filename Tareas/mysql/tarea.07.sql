CREATE TABLE compradores (
	id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  email VARCHAR(80) NOT NULL UNIQUE,
  direccion VARCHAR(80) NOT NULL,
  telefono SMALLINT NOT NULL,
  fecha_registro DATE DEFAULT CURRENT_DATE
);

CREATE TABLE carritos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  comprador_id_fk INT NOT NULL,
  fecha_creacion DATE DEFAULT CURRENT_DATE,
  FOREIGN KEY (comprador_id_fk) REFERENCES compradores(id)
);

CREATE TABLE productos (
	id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  descripcion TEXT NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  stock INT,
  fecha_creacion DATE DEFAULT CURRENT_DATE
);

CREATE TABLE carritos_productos (
	id INT PRIMARY KEY AUTO_INCREMENT,
  carrito_id_fk INT NOT NULL,
  producto_id_fk INT NOT NULL,
  cantidad INT NOT NULL,
  fecha_agregado DATE DEFAULT CURRENT_DATE,
  FOREIGN KEY (carrito_id_fk) REFERENCES carritos(id),
  FOREIGN KEY (producto_id_fk) REFERENCES producto(id)
);

INSERT INTO compradores(`nombre`,`email`,`direccion`,`telefono`,`fecha_registro`) VALUES (
  'Pepe',
	'pepe@gmail.com',
  'Lujan de cuyo, Mendoza, Argentina',
  '2615685594',
  '2023-01-10'
)

INSERT INTO `productos`(`nombre`, `descripcion`, `precio`, `stock`) VALUES (
	'Tv Samsung',
  'Tv samsung de 120 pulgadas muy grande',
  '189555,55',
  '6'
)

INSERT INTO `carritos`(`comprador_id_fk`, `fecha_creacion`) VALUES ('1','2024-02-26')

INSERT INTO `carritos_productos`(`carrito_id_fk`, `producto_id_fk`, `cantidad`) VALUES (
	'1',
  '1',
  '3'
)

ALTER TABLE compradores CHANGE `telefono` `telefono` INT NOT NULL;

UPDATE `compradores` 
SET telefono = '26156846630' 
WHERE id = 1