CREATE TABLE chat (
	chat_id INT PRIMARY KEY AUTO_INCREMENT,
  creado_en DATE DEFAULT CURRENT_DATE,
  mensaje TEXT NOT NULL,
  enviado_por_fk INT NOT NULL,
  recibido_por_fk INT NOT NULL,
  /* LAS FOREIGN KEY VAN DENTRO DE LA TABLA */
  FOREIGN KEY (enviado_por) REFERENCES usuarios(usuario_id) ON DELETE CASCADE, //esto te permite eliminar algo que tenga una clave foranea cuando se elimina la clave primaria
  FOREIGN KEY (recibido_por) REFERENCES usuarios(usuario_id)
)