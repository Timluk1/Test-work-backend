import { IUserDto } from "../../dto/user.dto";
import { tokenService } from "../token/token.service";
import { logger } from "../../lib/logger";
import { userRepository } from "../../database/repositories/user.repository";
import { ConflictError, NotFoundError, ValidationError } from "../../lib/appError";
import bcrypt from "bcrypt";

class AuthService {
    public async register(registerUserDto: IUserDto): Promise<string> {
        // Проверка на существование пользователя с таким email
        const user = await userRepository.findUserByEmail(registerUserDto.email);
        if (user) {
            logger.error(`User with email ${registerUserDto.email} already exists`);
            throw new ConflictError(`User with email ${registerUserDto.email} already exists`);
        }
        // генерация токена
        const token = await tokenService.generateToken(registerUserDto);

        // хэшируем пароль
        const hashPassword = await bcrypt.hash(registerUserDto.password, 3);
        // создание пользователя
        await userRepository.createUser({ email: registerUserDto.email, password: hashPassword});
        return token;
    }

    public async login(loginUserDto: IUserDto): Promise<string> {
        // проверяем на наличие пользователя в бд
        const user = await userRepository.findUserByEmail(loginUserDto.email);
        if (!user) {
            throw new NotFoundError(`User with email ${loginUserDto.email} is not exist`)
        }
        // проверяем пароль
        const isValid: boolean = await bcrypt.compare(loginUserDto.password, user.password);
        if (!isValid) {
            throw new ValidationError("Inccorect password")
        }

        const token = await tokenService.generateToken(loginUserDto);
        return token;

    }
}

export const authService = new AuthService();