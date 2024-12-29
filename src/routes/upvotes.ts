import { Router } from "express";
import { upvotesController } from "../controllers/upvotes/upvotes.controller";
import { upvoteValidator } from "../validation/upvote";
import { sendValidationError } from "../middlewares/sendValidationError";

export const upvotesRouter = Router();

// Эндпоинт для создания лайка
upvotesRouter.post(
    "/upvotes/:id",
    upvoteValidator,
    sendValidationError,
    upvotesController.addReactionToFeedback,
);

// Эндпоинт для получения всех реакций
upvotesRouter.get("/upvotes/:id", upvotesController.getAllReactions);

// Эндпоинт для удаления лайка
upvotesRouter.delete(
    "/upvotes/:id",
    upvotesController.deleteReactionFromFeedback,
);

upvotesRouter.put("/upvotes/:id", upvotesController.toggleReaction);
