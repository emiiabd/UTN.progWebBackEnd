//Codigo de TypeScript

//     puede ser string o null con la barra |
let nombre : string | null= 'pepe'; //Lo ideal es que cada vez que declaramos una variable, declaremos el tipo de dato que esta almacenando.

// Con any, es como una variable normal de JS (Puede ser cualquier tipo de dato)
let datoRandom : any = 'hola'


/* console.log('hola ' + nombre) */

const sumar = ( a: number, b: number) : number=>{
    return a +b;
}

const saludar = (edad : number = 17, nombre? : string) : string =>{
    console.log('mi edad es ' + edad);
    if(nombre){
        return 'Hola, ' + nombre
    }else{
        return 'Hola, no se tu nombre'
    }
}

/* console.log(saludar(18,'emi')) */

// sumar('pepe', 'juean') NO te va a dejar
// sumar(1, 2) SI

interface Persona{
    nombre : string,
    apellido : string,
    edad : number,
}

const persona : Persona = {
    nombre: 'pepe',
    apellido: 'suarez',
    edad: 10,
}

const persona2 : Persona = {
    nombre: 'pepito',
    apellido: 'suarezito',
    edad: 56,
}

//                                            Si la funcion no retorna nada, deberia colocarse : void (esto indica que no retorna nada)
const saludarAPersona = ( person : Persona) : void =>{
    alert('Hola ' + person.nombre)
}

/* saludarAPersona(persona2) */

/* 
CalcularIva que recibe un numero y devuelve un numero a que seral el 21% de numero recibido

obtenerImpuestoIva recibe un numeor y retorna un objeto, el obj tendra el siguiente Schema:
{
    iva: 21% del numero recibido,
    total: numero recibido + IVA,
    base: numero recibido,
}


*/

interface EsquemaIva{
    iva: number
    total: number
    base: number
}

const calcularIva = ( num: number ) : number => num * 0.21 
    
const obtenerImpuestoIva = ( num: number) : EsquemaIva=>{
    const resultado : EsquemaIva = {
        iva: calcularIva(num),
        total: calcularIva(num) + num,
        base: num
    }
    return resultado
}

/* 
crear una funcion que se llame crearPersonale que recibira un nombre, una edad y una ciudad de origen y retornara un objeto de tipo Persona

{
    nombre: nombre,
    edad: edad,
    ciudadOrigen: ciudadOrigen,
    vida: 100,
    armadura: 0,
    ataque: 0,
    defensa: 0
}
*/

interface Personaje {
    nombre: string,
    edad: number,
    ciudadOrigen: string,
    vida: number,
    armadura: number,
    ataque: number,
    defensa: number,
}

const crearPersonaje = (nombre: string, edad: number, city: string) : Personaje =>{
    return {
        nombre: nombre,
        edad: edad,
        ciudadOrigen: city,
        vida: 100,
        armadura: 0,
        ataque: 0,
        defensa: 0,
    }
}

console.log(crearPersonaje('Emi',222,'Mendoza'))


/* deuda tecnica */

/* tenemos que hacer un fetch */