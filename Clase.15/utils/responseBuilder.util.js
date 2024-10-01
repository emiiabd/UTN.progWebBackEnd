
/* 
Una propiedad styatic significa que la puedo acceder desde la misma clase
Ejemplo:
class ClaseX{
static valor= 9
}
console.log(ClaseX.valor) //esto mostrara 
*/

class ResponseBuilder {

  //Propiedad estatica: una propiedad o valor que se guarda en la clase
  //mapa de codigos
  //a los mapas hay que declararlos como inmutables
  static CODES = Object.freeze({ //Objeto inmutable, no permite agregar o borrar elementos, no se puede modificar, solo leer
    GET_INFO_SUCCESS: 'GET_INFO_SUCCESS',
  });

  constructor(){
    this.response = {
    ok: false,
    status: 500,
    payload : {},
    code: 'GET_INFO_ERROR'
    }
  };

  setStatus(status){
    this.response.status = status
    return this
  };

  setOk(ok){
    this.response.ok = ok
    return this
  };

  setPayload(payload){
    this.response.payload = payload
    return this
  };

  setCode(code){
    this.response.code = code
    return this
  }

  build(){
    return this.response
  };

};

export default ResponseBuilder;
/* //Se crea un objeto con este formaresponse = {
    ok: false,
    status: 500,
    payload : {},
    } */
/* const respuesta = new ResponseBuilder()
.setOk(true)
.setPayload({mensaje: 'hola'})
.setStatus(200)
.build() */
/* 
Por defecto mi responseBuilder va a ser una respuesta erronea
*/