import express from "express";
import { getPingController } from "../controllers/status.controller.js";


/* 
Router se encarda de crear nuevos endpoint, configurar middlewares, etc
*/
const statusRouter = express.Router()

statusRouter.get('/', getPingController)

export default statusRouter