import { Request, Response, NextFunction } from "express";
import { categoryService } from "../../services/category/category.service";
import { logger } from "../../lib/logger";

class CategoryController {
    public async getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categories = await categoryService.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    public async getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const category = await categoryService.getCategoryById(id);
            res.status(200).json(category);
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    public async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name } = req.body;
            const category = await categoryService.createCategory(name);
            res.status(201).json(category);
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    public async updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const updatedCategory = await categoryService.updateCategory(id, name);
            res.status(200).json(updatedCategory);
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    public async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            await categoryService.deleteCategory(id);
            res.status(204).send();
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }
}

export const categoryController = new CategoryController();
