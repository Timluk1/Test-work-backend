import { Router } from "express";
import { upvotesController } from "../controllers/upvotes/upvotes.controller";

export const upvotesRouter = Router();

// Эндпоинт для создания лайка
upvotesRouter.post("/upvotes", upvotesController.addReactionToFeedback);