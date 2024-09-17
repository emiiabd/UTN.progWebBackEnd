import { Empleado, tipoDePuesto, Pasante } from "./Types/Empleado.js"

/* 
Funcion flecha tiene dos tipos de retorno,
retorno explicito --> return()...
retorno implicito, cuando no tenes llaves la funcion flecha retorna lo que sigue despues de la flecha

*/





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


console.log(manejadorDeEmpleados)
const juan : Empleado | undefined = manejadorDeEmpleados.obtenerEmpleadoPorId(2)

//HERENCIAS

/* const pasante1 = new Pasante( 3 ,'Carlitos' , 20000 , '20/08/2024' , 3 , 'Developers' )

pasante1.cambiarSueldo(32000)

console.log(pasante1)

juan.cambiarSueldo(4630000)

console.log(juan)

pasante1.finalizarPasantia()

console.log(pasante1)

pasante1.presentar()
juan.presentar() */
