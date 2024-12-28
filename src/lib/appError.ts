export class AppError extends Error {
    message: string;
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}

class ValidationError extends AppError {
    constructor(message: string) {
        super(400, message);
    }
}

class NotFoundError extends AppError {
    constructor(message: string) {
        super(404, message);
    }
}

class UnauthorizedError extends AppError {
    constructor(message: string) {
        super(401, message);
    }
}

class ConflictError extends AppError {
    constructor(message: string) {
        super(409, message);
    }
}

export { ValidationError, NotFoundError, UnauthorizedError, ConflictError };
