import { levels } from '../constants/levels.js'
import { createLogTxt } from './filesystem.js'


class Log {

  constructor(level, module, message, timestamp, id) {
    this.level = level
    this.module = module
    this.message = message
    this.timestamp = timestamp
    this.id = id
  }
}

export class LoggerManager {

  constructor() {
    this.logs = []
    this.id = 0
  }

  addLog(level, module, message) {
    const log = new Log(level, module, message, new Date(), this.id++)
    try{
      if(!module || !message){
        throw {detail: 'Argumento invalido en el modulo o el mensaje'}
      } else if(!levels.find((value) => value === level)){
        throw {detail: 'Argumento invalido en el nivel'}
      }

      createLogTxt(log)
      return this.logs.push(log)
    }
    catch(error){
        return console.error(`ERROR: ${error.detail}`)
    }
  }
}
