import { Router } from "express";
import { categoryController } from "../controllers/category/category.controller";

// Роутер с эндпоинтами для работы с категориями
export const categoryRouter = Router();

categoryRouter.get("/category", categoryController.getAllCategories);
categoryRouter.get("/category/:id", categoryController.getCategoryById);
categoryRouter.post("/category", categoryController.createCategory);
categoryRouter.put("/category/:id", categoryController.updateCategory);
categoryRouter.delete("/category/:id", categoryController.deleteCategory);
