// Acciones de historial

class Accion{
  id: number;
  descripcion: string;
  fecha: number;

  constructor( descripcion: string, id: number, fecha: number){
    this.descripcion = descripcion;
    this.fecha = fecha;
    this.id = id
  }
}

// Manejador del historial

class Historial {
  historial: Accion[];
  id: number

  constructor(){
    this.historial = []
    this.id = 0
  }

  agregarAccion(accion : string) : Accion[]{
    const newAction : Accion = new Accion(accion, this.id++, Date.now());
    this.historial.push(newAction)
    return this.historial
  }

  eliminarAccionPorID( idAccion : number ) : Accion[] {
    this.historial = this.historial.filter((accion) => accion.id !== idAccion )
    return this.historial
  }

  eliminarTodo() : Accion[] {
    this.historial = []
    return this.historial
  }

  mostrarHistorial() : void{
    return console.log(this.historial)
  }
}

const historial : Historial = new Historial()

historial.agregarAccion('Regreso')
historial.agregarAccion('Regreso1')
historial.agregarAccion('Regreso')
historial.agregarAccion('Regreso1')
historial.agregarAccion('Regreso')
historial.agregarAccion('Regreso1')
historial.mostrarHistorial()
historial.eliminarAccionPorID(1)
historial.mostrarHistorial()


console.log(historial)