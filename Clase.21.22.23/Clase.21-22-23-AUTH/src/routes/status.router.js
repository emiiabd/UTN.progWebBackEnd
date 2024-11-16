import express from "express";
import { getPingController } from "../controllers/status.controller.js";
import { verifyTokenMiddleware } from "../middlewares/auth.middleware.js";


/* 
Router se encarda de crear nuevos endpoint, configurar middlewares, etc
*/
const statusRouter = express.Router()

statusRouter.get('/', getPingController)
statusRouter.get('/protected-route/ping', verifyTokenMiddleware(['admin', 'user']), getPingController)

export default statusRouter