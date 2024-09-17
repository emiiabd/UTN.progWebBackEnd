"use strict";
//Codigo de TypeScript
//     puede ser string o null con la barra |
let nombre = 'pepe'; //Lo ideal es que cada vez que declaramos una variable, declaremos el tipo de dato que esta almacenando.
// Con any, es como una variable normal de JS (Puede ser cualquier tipo de dato)
let datoRandom = 'hola';
/* console.log('hola ' + nombre) */
const sumar = (a, b) => {
    return a + b;
};
const saludar = (edad = 17, nombre) => {
    console.log('mi edad es ' + edad);
    if (nombre) {
        return 'Hola, ' + nombre;
    }
    else {
        return 'Hola, no se tu nombre';
    }
};
const persona = {
    nombre: 'pepe',
    apellido: 'suarez',
    edad: 10,
};
const persona2 = {
    nombre: 'pepito',
    apellido: 'suarezito',
    edad: 56,
};
//                                            Si la funcion no retorna nada, deberia colocarse : void (esto indica que no retorna nada)
const saludarAPersona = (person) => {
    alert('Hola ' + person.nombre);
};
const calcularIva = (num) => num * 0.21;
const obtenerImpuestoIva = (num) => {
    const resultado = {
        iva: calcularIva(num),
        total: calcularIva(num) + num,
        base: num
    };
    return resultado;
};
const crearPersonaje = (nombre, edad, city) => {
    return {
        nombre: nombre,
        edad: edad,
        ciudadOrigen: city,
        vida: 100,
        armadura: 0,
        ataque: 0,
        defensa: 0,
    };
};
console.log(crearPersonaje('Emi', 222, 'Mendoza'));
