import { categoryRepository } from "../../database/repositories";
import { NotFoundError, ValidationError } from "../../lib/appError";
import { isValidUUID } from "../../validation/checkUuid";

export class CategoryService {
    public async getAllCategories() {
        return await categoryRepository.getAllCategories();
    }

    public async getCategoryById(id: string) {
        const isValid = isValidUUID(id);
        if (!isValid) {
            throw new ValidationError("Invalid category id");
        }
        const category = await categoryRepository.getCategoryById(id);
        if (!category) {
            throw new NotFoundError("Category not found");
        }
        return category;
    }

    public async createCategory(name: string) {
        if (!name) {
            throw new ValidationError("Name is required");
        }
        return await categoryRepository.createCategory(name);
    }

    public async updateCategory(id: string, name: string) {
        const isValid = isValidUUID(id);
        if (!isValid) {
            throw new ValidationError("Invalid category id");
        }
        if (!name) {
            throw new ValidationError("Name is required");
        }

        const updatedCategory = await categoryRepository.updateCategory(id, name);
        if (!updatedCategory) {
            throw new NotFoundError("Category not found");
        }
        return updatedCategory;
    }

    public async deleteCategory(id: string) {
        const isValid = isValidUUID(id);
        if (!isValid) {
            throw new ValidationError("Invalid category id");
        }
        const isDeleted = await categoryRepository.deleteCategory(id);
        if (!isDeleted) {
            throw new NotFoundError("Category not found");
        }
        return isDeleted;
    }
}

export const categoryService = new CategoryService();