import { feedbackRepository } from "../../database/repositories";
import {
    IUpvotesDtoService,
    IUpvotesDtoServiceDelete,
} from "../../dto/upvotes.dto";
import { UnauthorizedError, ValidationError } from "../../lib/appError";
import { isValidUUID } from "../../validation/checkUuid";
import { upvotesRepository } from "../../database/repositories";
import { Upvotes } from "../../database/entities";

class UpvotesService {
    // добавление реакции на отзыв
    public async addReactionToDb(
        addReactionDto: IUpvotesDtoService,
    ): Promise<Upvotes | null> {
        const { feedbackId } = addReactionDto;
        const isValidUuid = isValidUUID(feedbackId);
        if (!isValidUuid) {
            throw new ValidationError("Invalid feedback id");
        }
        const feedback = await feedbackRepository.getFeedbackById(feedbackId);
        if (!feedback) {
            throw new ValidationError("Feedback not found");
        }
        const reaction = await upvotesRepository.getReactionByFeedbackAndUser(
            feedbackId,
            addReactionDto.user.id,
        );
        if (reaction) {
            throw new ValidationError(
                "You have already reacted to this feedback",
            );
        }
        const newReaction = {
            isLike: addReactionDto.isLike,
            feedback: feedback,
            user: addReactionDto.user,
        };
        const savedReaction =
            await upvotesRepository.addReactionToFeedback(newReaction);
        const newReactionDb = await upvotesRepository.getReactionsById(
            savedReaction.id,
        );
        return newReactionDb;
    }

    // получение всех реакций
    public async getAllReactions(feedbackId: string) {
        const isValidUuid = isValidUUID(feedbackId);
        if (!isValidUuid) {
            throw new ValidationError("Invalid feedback id");
        }
        const feedback = await feedbackRepository.getFeedbackById(feedbackId);
        if (!feedback) {
            throw new ValidationError("Feedback not found");
        }
        return await upvotesRepository.getReactions(feedbackId);
    }

    // удаление реакции
    public async deleteReactionFromDb(
        deleteReactionDto: IUpvotesDtoServiceDelete,
    ): Promise<void> {
        const { feedbackId } = deleteReactionDto;
        const isValidUuid = isValidUUID(feedbackId);
        if (!isValidUuid) {
            throw new ValidationError("Invalid feedback id");
        }
        const feedback = await feedbackRepository.getFeedbackById(feedbackId);
        if (!feedback) {
            throw new ValidationError("Feedback not found");
        }
        await upvotesRepository.deleteReactionFromFeedback(feedbackId);
    }

    public async toggleReaction(feedbackId: string) {
        const isValidUuid = isValidUUID(feedbackId);
        if (!isValidUuid) {
            throw new ValidationError("Invalid feedback id");
        }
        const feedback = await feedbackRepository.getFeedbackById(feedbackId);
        if (!feedback) {
            throw new ValidationError("Feedback not found");
        }
        const reaction = await upvotesRepository.getReactionByFeedbackAndUser(
            feedbackId,
            feedback.user.id,
        );
        if (!reaction) {
            throw new ValidationError("You have not reacted to this feedback");
        }
        await upvotesRepository.toggleReaction(reaction.id);
    }
}

export const upvotesService = new UpvotesService();
