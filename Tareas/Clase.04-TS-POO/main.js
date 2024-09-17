"use strict";
class Empleado {
    constructor(nombre, sueldo, fecha_de_contratacion, id_empleado, puesto) {
        this.nombre = nombre;
        this.sueldo = sueldo;
        this.fecha_de_contratacion = fecha_de_contratacion;
        this.id_empleado = id_empleado;
        this.puesto = puesto;
    }
}
class ManejadorDeEmpleados {
    constructor(empresa) {
        this.empleados = [];
        this.id_empleados = 0;
        this.empresa = empresa;
    }
    agregarEmpleado(nombre, sueldo, fecha_de_contratacion, puesto) {
        const nuevoEmpleado = new Empleado(nombre, sueldo, fecha_de_contratacion, this.id_empleados++, puesto);
        this.empleados.push(nuevoEmpleado);
        return this.empleados;
    }
    obtenerEmpleadoPorId(id_empleado) {
        return this.empleados.find((empleado) => empleado.id_empleado === id_empleado);
    }
    obtenerEmpleadoPorTipo(puesto) {
        return this.empleados.filter((empleado) => empleado.puesto === puesto);
    }
}
const manejadorDeEmpleados = new ManejadorDeEmpleados('Nokia');
/* const empleado1 : Empleado = new Empleado('Pepe', 12200, 'hoy', 'Developers')
const empleado2 : Empleado = new Empleado('Juan', 100000, 'hoy', 'Project Manager')
const empleado3 : Empleado = new Empleado('Lucas', 100000, 'hoy', 'Disigners')
 */
manejadorDeEmpleados.agregarEmpleado('Pepesito', 12200, 'hoy', 'Developers');
manejadorDeEmpleados.agregarEmpleado('Pepesito', 12200, 'hoy', 'Developers');
manejadorDeEmpleados.agregarEmpleado('Juan', 100000, 'hoy', 'Project Manager');
console.log(manejadorDeEmpleados.obtenerEmpleadoPorTipo('Developers'));
const juan = manejadorDeEmpleados.obtenerEmpleadoPorId(0);
console.log(juan);
