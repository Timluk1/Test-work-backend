import { Repository } from "typeorm";
import { IFeedbackDto, IRequestDelete } from "../../dto/feedback.dto";
import { Feedback } from "../entities/feedback.entity";
import { AppDataSource } from "../init";

export class FeedbackRepository {
    private readonly feedbackRepository: Repository<Feedback> = AppDataSource.getRepository(Feedback);

    public async createFeedback(feedback: Partial<IFeedbackDto>): Promise<Feedback> {
        return this.feedbackRepository.save(feedback);
    }

    public async getAllFeedbacks(count?: number): Promise<Feedback[]> {
        const queryBuilder = this.feedbackRepository.createQueryBuilder("feedback");
    
        if (count) {
            queryBuilder.take(count);  
        }
    
        return await queryBuilder.getMany(); 
    }

    public async getFeedbackById(id: string): Promise<Feedback | null> {
        return this.feedbackRepository.findOneBy({ id });
    }

    public async deleteFeedback(requestDeleteDto: IRequestDelete): Promise<void> {
        await this.feedbackRepository.delete({ id: requestDeleteDto.id });
    }

    public async saveFeedback(feedback: Feedback): Promise<Feedback> {
        return this.feedbackRepository.save(feedback);
    }
}

export const feedbackRepository = new FeedbackRepository();
