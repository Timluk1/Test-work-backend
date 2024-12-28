import { tokenService } from "../services/token/token.service";
import { UnauthorizedError, ValidationError } from "../lib/appError";
import { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger";
import { User } from "../database/entities/user.entity";

// Расширяем тип Request внутри этого файла
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export async function checkAuthMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            throw new ValidationError("Token is required");
        }

        const result = await tokenService.validateToken(token);
        if (!result) {
            throw new UnauthorizedError("Authentication error: invalid token");
        }

        req.user = result as User;
        next();
    } catch (error) {
        logger.info("Authentication error: invalid token");
        next(error);
    }
}
