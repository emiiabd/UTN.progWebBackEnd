CREATE TABLE contactos (
	contacto_id INT PRIMARY KEY AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  contacto_usuario_id INT NOT NULL,
  creado_en DATE DEFAULT CURRENT_DATE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id),
  FOREIGN KEY (contacto_usuario_id) REFERENCES usuarios(usuario_id),
  UNIQUE(usuario_id, contacto_usuario_id)
)

INSERT INTO `contactos`( `usuario_id_fk`, `contacto_usuario_id`) VALUES ('1','4'),('4','1')
