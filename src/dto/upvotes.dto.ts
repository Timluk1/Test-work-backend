import { User } from "../database/entities";

export interface IUpvotesDto {
    isLike: boolean;
}

export interface IUpvotesDtoService extends IUpvotesDto {
    feedbackId: string;
    user: User;
}

export interface IUpvotesDtoServiceDelete {
    feedbackId: string;
    user: User;
}
