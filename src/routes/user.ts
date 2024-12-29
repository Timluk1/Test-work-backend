import { Router } from "express";
import { userController } from "../controllers/user/user.controller";
import { userValidator } from "../validation/auth";
import { sendValidationError } from "../middlewares/sendValidationError";

// Роутер с эндпоинтами для пользователей
export const userRouter = Router();

// авторизация
userRouter.post("/auth/login", userController.login);
userRouter.post("/auth/register", userValidator, sendValidationError, userController.register);
