import { Repository } from "typeorm";
import { Upvotes } from "../entities";
import { AppDataSource } from "../init";
import { IUpvotesDto } from "../../dto/upvotes.dto";

export class UpvotesRepository {
    private readonly upvotesRepository: Repository<Upvotes> = AppDataSource.getRepository(Upvotes);
    // добавление реакции на отзыв
    public async addReactionToFeedback(addReactionDto: IUpvotesDto) {
        return this.upvotesRepository.save(addReactionDto);
    }
}

export const upvotesRepository = new UpvotesRepository();
