class ResponseBuilder {
  
  constructor(){
    this.response = {
      ok: false,
      status: 500,
      payload : {},
      message: 'GET_INFO_ERROR'
    }
  }

  setOK(bool){
    this.response.ok = bool
    return this
  }

  setStatus(status){
    this.response.status = status
    return this
  }

  setPayload(payload){
    this.response.payload = payload
    return this
  }

  setMessage(message){  
    this.response.message = message
    return this
  }

  build(){
    return this.response
  }

}

export {
  ResponseBuilder
}