import { Repository } from "typeorm";
import { Upvotes } from "../entities/upvotes.entity";
import { AppDataSource } from "../init";
import { IUpvotesDto } from "../../dto/upvotes.dto";

export class UpvotesRepository {
    private readonly upvotesRepository: Repository<Upvotes> =
        AppDataSource.getRepository(Upvotes);

    // добавление реакции на отзыв
    public async addReactionToFeedback(addReactionDto: IUpvotesDto) {
        const upvote = this.upvotesRepository.create(addReactionDto);
        return this.upvotesRepository.save(upvote);
    }

    public async getReactionsById(upvoteId: string) {
        const queryBuilder = this.upvotesRepository
            .createQueryBuilder("upvotes")
            .leftJoinAndSelect("upvotes.user", "user")
            .leftJoinAndSelect("upvotes.feedback", "feedback")
            .where("upvotes.id = :id", { id: upvoteId })
            .select(["upvotes.id", "upvotes.isLike", "user.id", "feedback.id"]);
        return await queryBuilder.getOne();
    }

    public async getReactions(feedbackId: string) {
        const queryBuilder = this.upvotesRepository
            .createQueryBuilder("upvotes")
            .leftJoinAndSelect("upvotes.user", "user")
            .leftJoinAndSelect("upvotes.feedback", "feedback")
            .where("feedback.id = :id", { id: feedbackId })
            .select(["upvotes.id", "upvotes.isLike", "user.id", "feedback.id"]);
        return await queryBuilder.getMany();
    }

    public async deleteReactionFromFeedback(upvoteId: string) {
        await this.upvotesRepository.delete({ id: upvoteId });
    }

    public async toggleReaction(upvoteId: string) {
        const upvote = await this.upvotesRepository.findOne({
            where: { id: upvoteId },
            select: ["id", "isLike"],
        });
        if (upvote) {
            upvote.isLike = !upvote.isLike;
            return this.upvotesRepository.save(upvote);
        }
        return null;
    }

    // метод для получения реакции по feedbackId и userId
    public async getReactionByFeedbackAndUser(
        feedbackId: string,
        userId: string,
    ): Promise<Upvotes | null> {
        return this.upvotesRepository.findOne({
            where: {
                feedback: { id: feedbackId },
                user: { id: userId },
            },
            select: ["id", "isLike", "user", "feedback"],
        });
    }
}

export const upvotesRepository = new UpvotesRepository();
