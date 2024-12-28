import { logger } from "../../lib/logger";
import { Response, Request } from "express";
import { IUserDto } from "../../dto/user.dto";
import { authService } from "../../services/auth/auth.service";

class UserController { 
    public async register(req: Request<{}, {}, IUserDto>, res: Response, next: any) {
        try {
            const token = await authService.register(req.body);
            logger.info("User register request");
            res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    }

    public async login(req: Request<{}, {}, IUserDto>, res: Response, next: any) {
        try {
            const token = await authService.login(req.body);
            logger.info("User login request");
            res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    }
}

export const userController = new UserController();