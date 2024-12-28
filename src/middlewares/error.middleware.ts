import { AppError } from "../lib/appError";
import {
    ValidationError,
    NotFoundError,
    UnauthorizedError,
    ConflictError,
} from "../lib/appError";
import { Request, Response, NextFunction } from "express";

// Middleware для обработки ошибок
export const errorMiddleware = (
    err: AppError,
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    let statusCode = 500; // Значение по умолчанию для неизвестных ошибок
    let message = "Internal Server Error"; // Сообщение по умолчанию

    res.setHeader("Content-Type", "application/json");

    if (err instanceof ValidationError) {
        statusCode = err.status || 400;
        message = err.message || "Validation Error";
    } else if (err instanceof NotFoundError) {
        statusCode = err.status || 404;
        message = err.message || "Resource Not Found";
    } else if (err instanceof UnauthorizedError) {
        statusCode = err.status || 401;
        message = err.message || "Unauthorized";
    } else if (err instanceof ConflictError) {
        statusCode = err.status || 409;
        message = err.message || "Conflict";
    }
    res.status(statusCode).json({ message });
};
