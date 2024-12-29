import { Request, Response, NextFunction } from "express";
import { upvotesService } from "../../services/upvotes/upvotes.service";
import { IUpvotesDto } from "../../dto/upvotes.dto";
import { logger } from "../../lib/logger";

export class UpvotesController {
    public async addReactionToFeedback(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const { isLike }: IUpvotesDto = req.body;
            const user = req.user;
            if (!user) {
                throw new Error("User id is not defined");
            }
            const upvote = await upvotesService.addReactionToDb({
                user,
                feedbackId: id,
                isLike,
            });
            res.status(201).json(upvote);
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    public async getAllReactions(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const reactions = await upvotesService.getAllReactions(id);
            res.status(200).json(reactions);
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async deleteReactionFromFeedback(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id } = req.params;
            const user = req.user;
            if (!user) {
                throw new Error("User id is not defined");
            }
            await upvotesService.deleteReactionFromDb({ user, feedbackId: id });
            res.status(200).json({});
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }

    async toggleReaction(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = req.user;
            if (!user) {
                throw new Error("User id is not defined");
            }
            await upvotesService.toggleReaction(id);
            res.status(200).json({});
        } catch (error) {
            logger.error(error);
            next(error);
        }
    }
}

export const upvotesController = new UpvotesController();
