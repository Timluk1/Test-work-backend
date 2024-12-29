import { body } from "express-validator";

export const upvoteValidator = [
    body("isLike")
        .isBoolean()
        .withMessage("isLike must be a boolean.")
        .custom((value) => {
            if (value !== true && value !== false) {
                throw new Error("isLike must be a boolean.");
            }
            return true;
        })
        .notEmpty()
        .withMessage("isLike is required."),
];
