import { Feedback } from "../../database/entities";
import { feedbackRepository } from "../../database/repositories/feedback.repository";
import { IFeedback, IRequestDelete, IFeedbackDto } from "../../dto/feedback.dto";
import { NotFoundError } from "../../lib/appError";
import { isValidUUID } from "../../validation/checkUuid";

class FeedbackService {
    public async createFeedback(feedback: IFeedback): Promise<Feedback> {
        return await feedbackRepository.createFeedback(feedback);
    }

    public async getFeedbacks(count?: number): Promise<Feedback[]> {
        if (count) {
            return await feedbackRepository.getAllFeedbacks(count); 
        }
        return await feedbackRepository.getAllFeedbacks(); 
    }

    public async getFeedbackById(id: string) {
        const feedback = feedbackRepository.getFeedbackById(id);
        if (!feedback) {
            throw new NotFoundError("Feedback not found");
        }
        return feedback;
    }

    public async updateFeedback(id: string, updatedFeedbackData: IFeedbackDto): Promise<Feedback> {
        const isValid = isValidUUID(id);
        if (!isValid) {
            throw new NotFoundError("Invalid feedback id");
        }
        const feedback = await feedbackRepository.getFeedbackById(id);
        if (!feedback) {
            throw new NotFoundError("Feedback not found");
        }
    
        const updatedFeedback = { ...feedback, ...updatedFeedbackData };  
        return await feedbackRepository.saveFeedback(updatedFeedback);  
    }
    

    public async deleteFeedback(feedback: IRequestDelete): Promise<void> {
        const feedbackFromDb = feedbackRepository.getFeedbackById(feedback.id);
        if (!feedbackFromDb) {
            throw new NotFoundError("Feedback not found");
        }
        await feedbackRepository.deleteFeedback(feedback);
    }
}

export const feedbackService = new FeedbackService();
