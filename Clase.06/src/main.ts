/* MySQL - INTRODDUCION A BASE DE DATOS*/

/* 
Para saber que es una base de datos: 
- Independencia lógica y física de los datos.
- NO HAYRedundancia mínima.
- Acceso concurrente por parte de múltiples usuarios.
- Integridad de los datos.
- Consultas complejas optimizadas.
- Seguridad de acceso y auditoría.
- Respaldo y recuperación.
- Acceso a través de lenguajes de programación estándar

Cada base da datos tiene una o mas tablas que guardan un conjunto de datos, y cada tabja tiene una o mas columnas y filas que guardan los datos en las columnas, y cada fila conforma un registro
- Se puede personalizar como vas a pedir los objetos de la tablas y las columnas
- Todas las tabas tienen una clave primaria (que no se puede repetir, por ejemplo en la primera fila un id diferente de la segunda)

* Clave foranea:
- Una clave foreanea es clave para entender las relaciones entre tablas
- Siempre esta asociada a una key primaria de una tabla
- Esto ayuda para hacer una redundancia minima entre las tablas
- Es la relacion de la base de datos entre tablas

** Cada vez que se crea una tabla hay que hacer un id, o un identificador unico (primary keys) **

* Tipos de campos
- - VARCHAR('tamaño', 30) - Cadenas de texto(string o alfanumericos), limitado a 255 caracteres
  - * Cuando se degina un campo alfanumerico se puede limitar a X caracteres, esto ayuda a optimizar la base de datos **buena practica**
- - INT/FLOAT - Numericos (principalmente enteros o reales (con decimales))
- - Booleanos (true o false)
- - DATE - Fechas (Almacenar fechas nos permiter hacer consultas entre fechas o calcular los dias entre las mismas)
- - Memos (Son string con un tamaño ilimitado )
- - Autoincrementables (no es un campo especial, pero es algo que vamos a hacer) Son valores que se incrementan a medida que se incrementa la tabla

** Cada vez que se crea una tabla hay que hacer un id, o un identificador unico (primary keys) **


'Hola mundo' - VARCHAR
7.36 - FLOAT
5896 - INT
'eestamos aprendiendo base de datos' - VARCHAR
04102021 - DATE

** Instalar MySQL **


** PhpMyAdmin - Administrador de base de datos **
- Es un software de codigo abierto (open source) que nos permite administrar la base de datos, esta escrito en php
- Tiene muchos errores con windows,pero es el que mas se utiliza para administrar la base de datos

-* XAMPP
  - error comun, en cmd encontrar el puerto con netstat -ano | findstr :(PUERTO)
  - cerrar puerto, taskkill /PID (NUMERO DE PID) /F

*/

