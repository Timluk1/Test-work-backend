import { Repository } from "typeorm";
import { IUserDto } from "../../dto/user.dto";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../init";

export class UserRepository {
    private readonly userRepository: Repository<User> = AppDataSource.getRepository(User);

    // Пример метода для получения всех пользователей
    public async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    // Исправление метода поиска пользователя по email
    public async findUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    // Пример метода для создания нового пользователя
    public async createUser(userData: Partial<IUserDto>): Promise<User> {
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }
}

export const userRepository = new UserRepository();
