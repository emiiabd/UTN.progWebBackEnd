import { LoggerManager } from "./helpers/logger.js";

const logger = new LoggerManager()

logger.addLog('infdo','index.js','Usuario creado con exito')
logger.addLog('error','index.js','Usuario incorrecto o inexistente')
logger.addLog('warn','index.js','Hay un usuario con el mismo id')
logger.addLog('debug','logger.js','Reparacion de archivo concretada')