import { Repository } from "typeorm";
import { Category } from "../entities";
import { AppDataSource } from "../init";

export class CategoryRepository {
    private readonly categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

    public async createCategory(name: string): Promise<Category> {
        const category = this.categoryRepository.create({ name });
        return await this.categoryRepository.save(category);
    }

    public async getCategoryById(id: string): Promise<Category | null> {
        return await this.categoryRepository.findOne({ where: { id } });
    }

    public async getAllCategories(): Promise<Category[]> {
        return await this.categoryRepository.find();
    }

    public async updateCategory(id: string, name: string): Promise<Category | null> {
        const category = await this.getCategoryById(id);
        if (!category) return null;

        category.name = name;
        return await this.categoryRepository.save(category);
    }

    public async deleteCategory(id: string): Promise<boolean> {
        const result = await this.categoryRepository.delete({ id });
        return result.affected !== 0;
    }
}

export const categoryRepository = new CategoryRepository();