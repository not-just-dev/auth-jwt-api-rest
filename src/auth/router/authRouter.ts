import express from "express";
import { AuthController } from "../controller/AuthController.js";
import { AuthInMemoryRepository } from "../repository/AuthInMemoryRepository.js";

const authRouter = express.Router();

const authRepository = new AuthInMemoryRepository();
const authController = new AuthController(authRepository);

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);

export default authRouter;
