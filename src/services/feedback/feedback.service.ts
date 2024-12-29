import { Feedback } from "../../database/entities";
import {
    IRequestDelete,
    IFeedbackDto,
    IFeedbackCreate,
} from "../../dto/feedback.dto";
import {
    categoryRepository,
    feedbackRepository,
    statusRepository,
} from "../../database/repositories";
import { NotFoundError } from "../../lib/appError";
import { isValidUUID } from "../../validation/checkUuid";

class FeedbackService {
    public async createFeedback(feedback: IFeedbackCreate): Promise<Feedback | null> {
        const { user, title, description, category_id, status_id } = feedback;

        // Проверяем наличие статуса
        const status = await statusRepository.getStatusById(status_id);
        if (!status) {
            throw new NotFoundError("Status not found");
        }

        // Проверяем наличие категории
        const category = await categoryRepository.getCategoryById(category_id);
        if (!category) {
            throw new NotFoundError("Category not found");
        }

        // Формируем новый объект для создания
        const newFeedback = {
            user,
            title,
            description,
            status,
            category,
        };

        const newFeedbackDb = await feedbackRepository.createFeedback(newFeedback);
        const response = await feedbackRepository.getFeedbackById(newFeedbackDb.id);
        return response;
    }

    public async getFeedbacks(count?: number): Promise<Feedback[]> {
        return count
            ? await feedbackRepository.getAllFeedbacks(count)
            : await feedbackRepository.getAllFeedbacks();
    }

    public async getFeedbackById(id: string): Promise<Feedback> {
        if (!isValidUUID(id)) {
            throw new NotFoundError("Invalid feedback id");
        }

        const feedback = await feedbackRepository.getFeedbackById(id);
        if (!feedback) {
            throw new NotFoundError("Feedback not found");
        }

        return feedback;
    }

    public async updateFeedback(
        id: string,
        updatedFeedbackData: IFeedbackDto
    ): Promise<Feedback> {
        if (!isValidUUID(id)) {
            throw new NotFoundError("Invalid feedback id");
        }

        const feedback = await feedbackRepository.getFeedbackById(id);
        if (!feedback) {
            throw new NotFoundError("Feedback not found");
        }

        // Обновляем объект
        const updatedFeedback = {
            ...feedback,
            ...updatedFeedbackData,
        };

        return await feedbackRepository.saveFeedback(updatedFeedback);
    }

    public async deleteFeedback(requestDeleteDto: IRequestDelete): Promise<void> {
        const feedback = await feedbackRepository.getFeedbackById(requestDeleteDto.id);
        if (!feedback) {
            throw new NotFoundError("Feedback not found");
        }

        await feedbackRepository.deleteFeedback(requestDeleteDto);
    }
}

export const feedbackService = new FeedbackService();
