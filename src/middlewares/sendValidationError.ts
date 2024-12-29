import { Response, Request, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ValidationError } from "../lib/appError";

export const sendValidationError = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const message = errors
            .array()
            .map((element) => element.msg)
            .join(", ");
        throw new ValidationError(message);
    }
    next();
};
