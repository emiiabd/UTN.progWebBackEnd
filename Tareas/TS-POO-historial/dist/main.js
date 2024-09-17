class Accion {
    constructor(descripcion, id, fecha) {
        this.id = id;
        this.descripcion = descripcion;
        this.fecha = fecha;
    }
    mostrarAccion() {
        return console.log(this.descripcion);
    }
}
class Cambio {
    constructor(id_cambio, valor_anterior, nuevo_valor, campo) {
        this.id_cambio = id_cambio;
        this.valor_anterior = valor_anterior;
        this.nuevo_valor = nuevo_valor;
        this.campo = campo;
    }
    mostrarAccion() {
        return console.log(`En el campo ${this.campo} se aplico el nuevo valor ${this.nuevo_valor}`);
    }
}
////////////////////////////////////////////////////////////////////////////////
class AccionInicioSesion extends Accion {
    constructor(id, fecha, dispositivo_origen, descripcion) {
        super(descripcion, id, fecha);
        this.dispositivo_origen = dispositivo_origen;
    }
    mostrarAccion() {
        return console.log(`Se inicio sesion desde ${this.dispositivo_origen}`);
    }
}
class AccionCierreSesion extends Accion {
    constructor(id, fecha, dispositivo_origen, tiempo_de_sesion, descripcion) {
        super(descripcion, id, fecha);
        this.dispositivo_origen = dispositivo_origen;
        this.tiempo_de_sesion = tiempo_de_sesion;
    }
    mostrarAccion() {
        return console.log(`Se cerro sesion desde ${this.dispositivo_origen} por ${this.tiempo_de_sesion} minutos`);
    }
}
class AccionActualizacionPerfil extends Accion {
    constructor(id, fecha, descripcion) {
        super(descripcion, id, fecha);
        this.cambios = [];
    }
    agregarCambio(id_cambio, valor_anterior, nuevo_valor, campo) {
        this.cambios.push(new Cambio(id_cambio, valor_anterior, nuevo_valor, campo));
    }
    mostrarAccion() {
        return console.log(`Se aplicaron los siguientes cambios: ${this.cambios}`);
    }
}
//revisar despues
class AccionCompra extends Accion {
    constructor(id, fecha, total, descripcion) {
        super(descripcion, id, fecha);
        this.productos = [];
        this.total = total;
    }
    agregarProducto(producto) {
        this.productos.push(producto);
    }
    mostrarAccion() {
        for (const producto of this.productos) {
            console.log(`Se compraron los siguientes productos: ${producto} al siguiente total de ${this.total}`);
        }
        return;
    }
}
class AccionEnvioMensaje extends Accion {
    constructor(id, fecha, destinatario, mensaje, descripcion) {
        super(descripcion, id, fecha);
        this.destinatario = destinatario;
        this.mensaje = mensaje;
    }
    mostrarAccion() {
        return console.log(`Se envio un email a ${this.destinatario} con el siguiente mensaje: ${this.mensaje}`);
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////
class Historial {
    constructor() {
        this.acciones = [];
    }
    agregarAccion(accion) {
        this.acciones.push(accion);
        return this.acciones;
    }
    mostrarHistorial() {
        for (const accion of this.acciones) {
            console.log(accion.mostrarAccion());
        }
    }
    eliminarAccionPorID(idAccion) {
        this.acciones = this.acciones.filter((accion) => Number(accion.id) !== Number(idAccion));
        return this.acciones;
    }
    eliminarTodo() {
        this.acciones = [];
        return this.acciones;
    }
}
const historial = new Historial();
const accion_inicioSesion = new AccionInicioSesion(1, Date.now(), 'celular', 'Se inicio sesion');
const accion_cierreSesion = new AccionCierreSesion(2, Date.now(), 'celular', 10, 'Se cerro sesion');
const accion_actualizacionPerfil = new AccionActualizacionPerfil(3, Date.now(), 'Emiliano');
accion_actualizacionPerfil.agregarCambio(1, 'Emiliano', 'Emii', 'nombre');
const accion_compra = new AccionCompra(4, Date.now(), 1000, 'Se compraron los siguientes productos');
historial.agregarAccion(accion_inicioSesion);
historial.agregarAccion(accion_cierreSesion);
historial.agregarAccion(accion_actualizacionPerfil);
historial.agregarAccion(accion_compra);
historial.mostrarHistorial();
historial.eliminarAccionPorID(3);
/* historial.mostrarHistorial() */
historial.eliminarTodo();
/* historial.mostrarHistorial() */
