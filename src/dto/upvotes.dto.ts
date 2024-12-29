export interface IUpvotesDto {
    isLike: boolean;
}

export interface IUpvotesDtoService extends IUpvotesDto {
    feedbackId: string;
    userId: string;
}