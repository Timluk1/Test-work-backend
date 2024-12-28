import { Router } from "express";
import { userController } from "../controllers/user/user.controller";

// Роутер с эндпоинтами для пользователей
export const userRouter = Router();

// авторизация
userRouter.post("/auth/login", userController.login);
userRouter.post("/auth/register", userController.register);
