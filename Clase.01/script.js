/*let objeto_en_JSON = `{
    "version": "1.0.0",
    "lang": {
        "es": {
            "title": "Configuración de la página"
        },
        "en": {
            "title": "Page Configuration"
        }
    }
}`;

let objetoEnJS = JSON.parse(objeto_en_JSON)

console.log(objetoEnJS)

let persona = {nomre: 'pepe', apellido: 'perito'}

let personaEnJSON = JSON.stringify(persona)

console.log(personaEnJSON)*/


//status 200: significa que la respuesta se completo correctamente

/* const getLukeSkywalker = async () =>{ 
	//async: crear la funcion asincronica
	//await: nos permite trabajar en forma sincronica con una funcion asincronica

	const URL_API = 'https://swapi.dev/api/'
	const rta = await fetch(URL_API + 'people/1', { //fetch siempre retorna una promise, y todas las promise son async
		method: 'GET' //Generalmente se utiliza para solicitar informacion
	})

	const resultado = await rta.json()
	console.log(resultado)
}

getLukeSkywalker() */

/* let hora = new Date()

console.log(hora.toTimeString()) */

const formLoginHTML = document.getElementById('form')

const validarNombre = (value) => Boolean(true) && value.length > 5
const validarEdad = (value) => Boolean(true) && value >= 18 && !isNaN(value)

const formLoginInputs = {
    'nombre' : {
        validate: validarNombre
    },
    'edad' : {
        validate : validarEdad
    }
}


formLoginHTML.addEventListener("submit", (event) => {
    event.preventDefault()
    const formLoginData = new FormData(formLoginHTML)
    for(const propiedad in formLoginInputs){
        const inpoutValue = formLoginData.get(propiedad)
        console.log(formLoginInputs[propiedad].validate(inpoutValue))

        /*  */
    }
})

/* Hola profe buenas noches, tenia una duda ya que estoy barajando la posibilidad en el futuro de seguir el camino de la programacion a lo que seria seguridad web o hacking etico, tambien estuve viendo los cursos de la utn y tal vez siga con el de programación web avanzado. Me gustaria saber si conoce de algun foro o pagina donde enseñen las buenas practicas en validaciones de javaScript */