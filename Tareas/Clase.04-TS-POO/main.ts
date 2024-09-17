/* 
Funcion flecha tiene dos tipos de retorno,
retorno explicito --> return()...
retorno implicito, cuando no tenes llaves la funcion flecha retorna lo que sigue despues de la flecha

*/
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
}

class ManejadorDeEmpleados {
  id_empleados: number
  empleados: Empleado[]
  empresa: string

  constructor(empresa: string){
    this.empleados = []
    this.id_empleados = 0
    this.empresa = empresa
  }

  agregarEmpleado(nombre: string, sueldo: number, fecha_de_contratacion: string, puesto: tipoDePuesto) : Empleado[] {
    const nuevoEmpleado : Empleado = new Empleado(nombre, sueldo, fecha_de_contratacion, this.id_empleados++ , puesto)
    this.empleados.push(nuevoEmpleado)
    return this.empleados
  }

  obtenerEmpleadoPorId(id_empleado: number) : Empleado | undefined{
    return this.empleados.find((empleado : Empleado) : boolean => empleado.id_empleado === id_empleado)
  }

  obtenerEmpleadoPorTipo(puesto: tipoDePuesto) : Empleado[] | undefined{
    return this.empleados.filter((empleado : Empleado) : boolean => empleado.puesto === puesto)
  }
}

const manejadorDeEmpleados : ManejadorDeEmpleados = new ManejadorDeEmpleados('Nokia')

/* const empleado1 : Empleado = new Empleado('Pepe', 12200, 'hoy', 'Developers')
const empleado2 : Empleado = new Empleado('Juan', 100000, 'hoy', 'Project Manager')
const empleado3 : Empleado = new Empleado('Lucas', 100000, 'hoy', 'Disigners')
 */

manejadorDeEmpleados.agregarEmpleado('Pepesito', 12200, 'hoy', 'Developers')
manejadorDeEmpleados.agregarEmpleado('Pepesito', 12200, 'hoy', 'Developers')
manejadorDeEmpleados.agregarEmpleado('Juan', 100000, 'hoy', 'Project Manager')


console.log(manejadorDeEmpleados.obtenerEmpleadoPorTipo('Developers'))

const juan : Empleado | undefined = manejadorDeEmpleados.obtenerEmpleadoPorId(0)
console.log(juan)