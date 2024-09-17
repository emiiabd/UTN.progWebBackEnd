const saludar = (nombre = 'pepe') =>{
    return console.log('Hola '+ nombre)
}
saludar() // expect pepe
saludar('juan') //expect juan