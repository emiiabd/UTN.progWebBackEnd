// Acciones de historial
class Accion {
    constructor(descripcion, id, fecha) {
        this.descripcion = descripcion;
        this.fecha = fecha;
        this.id = id;
    }
}
// Manejador del historial
class Historial {
    constructor() {
        this.historial = [];
        this.id = 0;
    }
    agregarAccion(accion) {
        const newAction = new Accion(accion, this.id++, Date.now());
        this.historial.push(newAction);
        return this.historial;
    }
    eliminarAccionPorID(idAccion) {
        this.historial = this.historial.filter((accion) => accion.id !== idAccion);
        return this.historial;
    }
    eliminarTodo() {
        this.historial = [];
        return this.historial;
    }
    mostrarHistorial() {
        return console.log(this.historial);
    }
}
const historial = new Historial();
historial.agregarAccion('Regreso');
historial.agregarAccion('Regreso1');
historial.agregarAccion('Regreso');
historial.agregarAccion('Regreso1');
historial.agregarAccion('Regreso');
historial.agregarAccion('Regreso1');
historial.mostrarHistorial();
historial.eliminarAccionPorID(1);
historial.mostrarHistorial();
console.log(historial);
