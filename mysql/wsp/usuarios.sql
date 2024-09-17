CREATE TABLE usuarios (
  usuario_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(80) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  creado_en DATE DEFAULT CURRENT_DATE
)

INSERT INTO usuarios (username, email, password_hash) VALUES ('pepe', 'pepe@gmail.com', 'pepe123')

DELETE FROM usuarios WHERE  username = 'maria'

INSERT INTO usuarios (`username`,`email`,`password_hash`) VALUES ('leonel','leo@gmail.com','leo123'),('Carlita','carl@gmail.com','carl123')

DELETE FROM usuarios WHERE usuario_id = 5 (el usuario juan lo tenia creado con id 5)

UPDATE usuarios
set username = 'Carlota'
WHERE usuario_id = 8


/* Alterar nombre de mi tabla */

ALTER TABLE usuarios RENAME TO usuarios2

/* Para alterar una columna */

ALTER TABLE usuarios2 CHANGE `password_hash` `password` VARCHAR(255) NOT NULL