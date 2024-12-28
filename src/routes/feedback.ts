import { Router } from "express";
import { feedbackController } from "../controllers/feedback/feedback.controller";

// Роутер с эндпоинтами для фидбеков
export const feedbackRouter = Router();

feedbackRouter.get("/feedback", feedbackController.getAllFeedbacks);
feedbackRouter.get("/feedback/:id", feedbackController.getFeedbackById);
feedbackRouter.post("/feedback", feedbackController.createFeedback);
feedbackRouter.put("/feedback/:id", feedbackController.updateFeedback);
feedbackRouter.delete("/feedback/:id", feedbackController.deleteFeedback);
