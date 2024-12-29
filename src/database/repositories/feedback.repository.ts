import { Repository } from "typeorm";
import { IFeedbackRepository, IRequestDelete } from "../../dto/feedback.dto";
import { Feedback } from "../entities/feedback.entity";
import { AppDataSource } from "../init";

export class FeedbackRepository {
    private readonly feedbackRepository: Repository<Feedback> = AppDataSource.getRepository(Feedback);

    public async createFeedback(feedback: IFeedbackRepository): Promise<Feedback> {
        const newFeedback = await this.feedbackRepository.create(feedback);
        return await this.feedbackRepository.save(newFeedback);
    }

    public async getAllFeedbacks(count?: number): Promise<Feedback[]> {
        const queryBuilder = this.feedbackRepository.createQueryBuilder("feedback")
            .leftJoinAndSelect("feedback.user", "user")
            .leftJoinAndSelect("feedback.category", "category")
            .leftJoinAndSelect("feedback.status", "status")
            .leftJoinAndSelect("feedback.upvotes", "upvotes")
            .select([
                "feedback.id",
                "feedback.title",
                "feedback.description",
                "feedback.created_at",
                "feedback.updated_at",
                "user.id",
                "category.id",
                "status.id",
                "upvotes.id"
            ]);

        if (count) {
            queryBuilder.take(count);  
        }

        return await queryBuilder.getMany(); 
    }

    public async getFeedbackById(id: string): Promise<Feedback | null> {
        const queryBuilder = this.feedbackRepository.createQueryBuilder("feedback")
            .leftJoinAndSelect("feedback.user", "user")
            .leftJoinAndSelect("feedback.category", "category")
            .leftJoinAndSelect("feedback.status", "status")
            .leftJoinAndSelect("feedback.upvotes", "upvotes")
            .where("feedback.id = :id", { id })
            .select([
                "feedback.id",
                "feedback.title",
                "feedback.description",
                "feedback.created_at",
                "feedback.updated_at",
                "user.id",
                "category.id",
                "status.id",
                "upvotes.id"
            ]);

        return await queryBuilder.getOne();
    }

    public async deleteFeedback(requestDeleteDto: IRequestDelete): Promise<void> {
        await this.feedbackRepository.delete({ id: requestDeleteDto.id });
    }

    public async saveFeedback(feedback: Feedback): Promise<Feedback> {
        return this.feedbackRepository.save(feedback);
    }
}

export const feedbackRepository = new FeedbackRepository();