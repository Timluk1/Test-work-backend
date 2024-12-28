import { body } from "express-validator";

export const feedbackValidator = [
    body("title")
        .isString().withMessage("Title must be a string.")
        .notEmpty().withMessage("Title is required.")
        .isLength({ min: 3 }).withMessage("Title must be at least 3 characters long."),
    
    body("description")
        .isString().withMessage("Description must be a string.")
        .notEmpty().withMessage("Description is required.")
        .isLength({ min: 5 }).withMessage("Description must be at least 5 characters long."),
    
    body("category")
        .isString().withMessage("Category must be a string.")
        .notEmpty().withMessage("Category is required.")
        .isLength({ min: 3 }).withMessage("Category must be at least 3 characters long."),

    body("status")
        .isString().withMessage("Status must be a string.")
        .isLength({ min: 3 }).withMessage("Category must be at least 3 characters long.")
        .notEmpty().withMessage("Status is required.")
];
