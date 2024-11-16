import express from "express";
import { verifyApiKeyMiddleware } from "../middlewares/auth.middleware.js";
import { setRoleController } from "../controllers/user.controller.js";

const userRouter = express.Router()

userRouter.use(verifyApiKeyMiddleware)

userRouter.put('/setRole', setRoleController)

export default userRouter