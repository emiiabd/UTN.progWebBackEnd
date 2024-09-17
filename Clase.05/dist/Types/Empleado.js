class Empleado {
    constructor(nombre, sueldo, fecha_de_contratacion, id_empleado, puesto) {
        this.nombre = nombre;
        this.sueldo = sueldo;
        this.fecha_de_contratacion = fecha_de_contratacion;
        this.id_empleado = id_empleado;
        this.puesto = puesto;
    }
    cambiarSueldo(nuevoSueldo) {
        this.sueldo = nuevoSueldo;
        return this.sueldo;
    }
    presentar() {
        alert('Hola me llamo ' + this.nombre + ' y trabajo como ' + this.puesto);
    }
}
//** HERENCIAS **
//       extends toma TODO lo que tiene el Empleado y se le puede crear cosas nuevas
class Pasante extends Empleado {
    constructor(tiempo_prueba_meses, nombre, sueldo, fecha_de_contratacion, id_empleado, puesto) {
        //invoca el constructor de la clase padre, "la herencia del padre". Es la invocacion de una funcion
        super(nombre, sueldo, fecha_de_contratacion, id_empleado, puesto);
        this.tiempo_prueba_meses = tiempo_prueba_meses;
        this.activo = true;
    }
    //polimorfismo
    presentar() {
        alert('Hola soy el pasante ' + this.nombre + ' y trabajo como ' + this.puesto);
    }
    finalizarPasantia() {
        this.activo = false;
        return this.activo;
    }
}
export { Empleado, Pasante };
