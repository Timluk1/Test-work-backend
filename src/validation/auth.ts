import { body } from "express-validator";

export const userValidator = [
    body("password", "Password must be at least 7 characters long").isLength({ min: 7 }),
    body("email", "Invalid email").isEmail(),
];