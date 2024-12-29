import { Request, Response, NextFunction } from "express";
import { feedbackService } from "../../services/feedback/feedback.service";
import { IFeedbackDto, IRequestGetFeedbacks } from "../../dto/feedback.dto";
import { logger } from "../../lib/logger";

class FeedbackController {
    public async createFeedback(req: Request<{}, {}, IFeedbackDto>, res: Response, next: NextFunction) {
        try {
            const feedback: IFeedbackDto = req.body;
            const user = req.user;
            // если не нашли пользователя при антефикации
            if (!user) {
                throw new Error("User not found");
            }
            const newFeedback = await feedbackService.createFeedback({ ...feedback, user });
            logger.info("Feedback created successfully");
            res.status(201).json(newFeedback);
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    public async getAllFeedbacks(req: Request<{}, {}, IRequestGetFeedbacks>, res: Response, next: NextFunction) {
        try {
            const { count } = req.body;  
            const feedbacks = await feedbackService.getFeedbacks(count);
            logger.info("Feedbacks fetched successfully");
            res.status(200).json(feedbacks);
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    public getFeedbackById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            const feedback = feedbackService.getFeedbackById(id);
            logger.info("Feedback fetched successfully");
            res.status(200).json(feedback);
        } catch (error) {
            next(error);
        }
    }

    public async updateFeedback(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id; 
            const updatedFeedbackData: IFeedbackDto = req.body; 
    
            const updatedFeedback = await feedbackService.updateFeedback(id, updatedFeedbackData);
            logger.info("Feedback updated successfully");
            res.status(200).json(updatedFeedback); 
        } catch (error) {
            logger.error(error);
            next(error); 
        }
    }
    

    public async deleteFeedback(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id;
            await feedbackService.deleteFeedback({ id });
            logger.info("Feedback deleted successfully");
            res.status(204).send();
        } catch(error) {
            logger.error(error);
            next(error);
        }
    }
}

export const feedbackController = new FeedbackController();
