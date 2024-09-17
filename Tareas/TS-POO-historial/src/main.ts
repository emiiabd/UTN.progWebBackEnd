class Accion {
  id : number
  descripcion : string
  fecha : number
  
  constructor( descripcion : string, id : number, fecha : number ){
    this.id = id
    this.descripcion = descripcion
    this.fecha = fecha
  }
  
  mostrarAccion() : void{
    return console.log(this.descripcion)
  }
}

class Cambio {
  id_cambio : number
  valor_anterior : string
  nuevo_valor : string
  campo : string

  constructor( id_cambio : number, valor_anterior : string, nuevo_valor : string, campo : string ){
    this.id_cambio = id_cambio
    this.valor_anterior = valor_anterior
    this.nuevo_valor = nuevo_valor
    this.campo = campo
  }

  mostrarCambio() : void{
    return console.log(`En el campo ${this.campo} se aplico el nuevo valor ${this.nuevo_valor}`)
  }
}

////////////////////////////////////////////////////////////////////////////////
class AccionInicioSesion extends Accion {
  dispositivo_origen : string

  constructor( id : number, fecha : number, dispositivo_origen : string, descripcion : string ){
    super(descripcion, id, fecha)
    this.dispositivo_origen = dispositivo_origen
  }

  mostrarAccion() : void{
    return console.log(`Se inicio sesion desde ${this.dispositivo_origen}`)
  }
}

class AccionCierreSesion extends Accion {
  dispositivo_origen : string
  tiempo_de_sesion : number

  constructor( id : number, fecha : number, dispositivo_origen : string, tiempo_de_sesion : number, descripcion : string ){
    super(descripcion, id, fecha)
    this.dispositivo_origen = dispositivo_origen
    this.tiempo_de_sesion = tiempo_de_sesion
  }

  mostrarAccion() : void{
    return console.log(`Se cerro sesion desde ${this.dispositivo_origen} por ${this.tiempo_de_sesion} minutos`)
  }
}

class AccionActualizacionPerfil extends Accion {
  cambios : Cambio[]

  constructor( id : number, fecha : number, descripcion : string ){
    super(descripcion, id, fecha)
    this.cambios = []
  }

  agregarCambio( id_cambio : number, valor_anterior : string, nuevo_valor : string, campo : string ){
    this.cambios.push(new Cambio(id_cambio, valor_anterior, nuevo_valor, campo))
  }

  mostrarAccion() : void{
    return console.log(`Se aplicaron los siguientes cambios: ${this.cambios}`)
  }
}

//revisar despues
class AccionCompra extends Accion {
  productos : string[]
  total : number

  constructor( id : number, fecha : number, total : number, descripcion : string ){
    super(descripcion, id, fecha)
    this.productos = []
    this.total = total
  }

  agregarProducto( producto : string ){
    this.productos.push(producto)
  }

  mostrarAccion() : void{
    for ( const producto of this.productos ){
      console.log(`Se compraron los siguientes productos: ${producto} al siguiente total de ${this.total}`)}
    return 
  }
}

class AccionEnvioMensaje extends Accion {
  destinatario : string
  mensaje : string

  constructor( id : number, fecha : number, destinatario : string, mensaje : string, descripcion : string ){
    super(descripcion, id, fecha)
    this.destinatario = destinatario
    this.mensaje = mensaje
  }

  mostrarAccion() : void{
    return console.log(`Se envio un email a ${this.destinatario} con el siguiente mensaje: ${this.mensaje}`)
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////
class Historial {
  acciones : Accion[]

  constructor(){
    this.acciones = []
  }

  agregarAccion( accion : Accion ) : Accion[]{
    this.acciones.push(accion)
    return this.acciones
  }

  mostrarHistorial() : void{
    for (const accion of this.acciones) {
      console.log(accion.mostrarAccion())
    }
  }

  eliminarAccionPorID( idAccion : number ) : Accion[]{
    this.acciones = this.acciones.filter((accion) => Number(accion.id) !== Number(idAccion))
    return this.acciones
  }

  eliminarTodo() : Accion[]{
    this.acciones = []
    return this.acciones
  }
}

const historial = new Historial()

const accion_inicioSesion = new AccionInicioSesion(1, Date.now(), 'celular', 'Se inicio sesion')
const accion_cierreSesion = new AccionCierreSesion(2, Date.now(), 'celular', 10, 'Se cerro sesion')
const accion_actualizacionPerfil = new AccionActualizacionPerfil(3, Date.now(), 'Emiliano')
accion_actualizacionPerfil.agregarCambio(1, 'Emiliano', 'Emii', 'nombre')
const accion_compra = new AccionCompra(4, Date.now(), 1000, 'Se compraron los siguientes productos')

historial.agregarAccion(accion_inicioSesion)
historial.agregarAccion(accion_cierreSesion)
historial.agregarAccion(accion_actualizacionPerfil)
historial.agregarAccion(accion_compra)
historial.mostrarHistorial() 
historial.eliminarAccionPorID(3)
/* historial.mostrarHistorial() */
historial.eliminarTodo()
/* historial.mostrarHistorial() */


