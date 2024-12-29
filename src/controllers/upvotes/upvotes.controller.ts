import { Request, Response, NextFunction } from "express";
import { upvotesService } from "../../services/upvotes/upvotes.service";
import { IUpvotesDto } from "../../dto/upvotes.dto";
import { logger } from "../../lib/logger";

export class UpvotesController {
    public async addReactionToFeedback(req: Request<{ feedbackId: string }, {}, IUpvotesDto>, res: Response, next: NextFunction) {
        try {
            const { feedbackId } = req.params;
            const { isLike }: IUpvotesDto = req.body;
            const user = req.user; 
            if (!user) {
                throw new Error("User id is not defined");
            }
            const upvote = await upvotesService.addReactionToDb({ userId: user.id, feedbackId, isLike });
            res.status(201).json(upvote);
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }
}

export const upvotesController = new UpvotesController();