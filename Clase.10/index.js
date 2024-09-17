/* 
npm init -y
npm i -D nodemon  
*/

console.log('hola mundo desde NODE.js')

const saludar = () => {
  console.log('hola')
}

saludar()

//DOM = document = document object model
//BOM = windows = browser object model

/* alert('hola')
window.alert() 
document.write('hola')
*/ //No se puede usar nada que sea del navegador, solo consola

//se puede usar la consola

console.log('hello')
console.error('error') //te muestra el mensaje en rojo
console.warn('warning') //te muestra el mensaje en amarillo
console.info('info')
console.dir('dir') //te muestra el obejto en verde
console.table({ a:1 , b:2 , c:3 , d:80}) //te muestra el objeto en una tabla