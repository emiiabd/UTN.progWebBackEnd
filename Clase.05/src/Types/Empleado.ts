type tipoDePuesto = 'Project Manager' | 'Developers' | 'Disigners' | 'Marketing'

class Empleado {
  nombre: string
  sueldo: number
  fecha_de_contratacion: string
  id_empleado: number
  puesto: tipoDePuesto

  constructor(nombre: string, sueldo: number, fecha_de_contratacion: string, id_empleado: number, puesto: tipoDePuesto){
    this.nombre = nombre
    this.sueldo = sueldo
    this.fecha_de_contratacion = fecha_de_contratacion
    this.id_empleado = id_empleado
    this.puesto = puesto
  }
  
  cambiarSueldo(nuevoSueldo: number) : number {
    this.sueldo = nuevoSueldo
    return this.sueldo
  }

  presentar() : void{
    alert('Hola me llamo ' + this.nombre + ' y trabajo como ' + this.puesto)
  }
}

//** HERENCIAS **
//       extends toma TODO lo que tiene el Empleado y se le puede crear cosas nuevas
class Pasante extends Empleado{
  tiempo_prueba_meses: number
  jornada_en_hr: number
  activo: boolean

  constructor(
    tiempo_prueba_meses: number,
    nombre: string,
    sueldo: number,
    fecha_de_contratacion: string,
    id_empleado: number,
    puesto: tipoDePuesto,
  ){
    //invoca el constructor de la clase padre, "la herencia del padre". Es la invocacion de una funcion
    super(nombre, sueldo, fecha_de_contratacion, id_empleado, puesto)
    this.tiempo_prueba_meses = tiempo_prueba_meses
    this.activo = true
  }
  //polimorfismo
  presentar(): void {
    alert('Hola soy el pasante '+this.nombre+' y trabajo como '+this.puesto)
  }
  finalizarPasantia(){
    this.activo = false
    return this.activo
  }

}
export {Empleado, tipoDePuesto, Pasante}