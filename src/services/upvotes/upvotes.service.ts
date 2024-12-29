import { feedbackRepository } from "../../database/repositories";
import { IUpvotesDtoService } from "../../dto/upvotes.dto";
import { ValidationError } from "../../lib/appError";
import { isValidUUID } from "../../validation/checkUuid";
import { upvotesRepository } from "../../database/repositories";

class UpvotesService {
    // добавление реакции на отзыв
    public async addReactionToDb(addReactionDto: IUpvotesDtoService): Promise<void> {
        const { feedbackId, isLike } = addReactionDto;
        const isValidUuid = isValidUUID(feedbackId);
        if (!isValidUuid) {
            throw new ValidationError("Invalid feedback id");
        }
        const feedback = await feedbackRepository.getFeedbackById(feedbackId);
        if (!feedback) {
            throw new ValidationError("Feedback not found");
        }
        await upvotesRepository.addReactionToFeedback(addReactionDto);
    }


}

export const upvotesService = new UpvotesService();