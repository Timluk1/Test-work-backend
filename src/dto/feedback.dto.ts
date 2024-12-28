import { User } from "../database/entities";

export interface IFeedbackDto {
    title: string;
    description: string;
    category: string;
    status: string;
}       

export interface IFeedback extends IFeedbackDto {
    user: User;
}

export interface IRequestDelete {
    id: string;
}

export interface IRequestGetFeedbacks{
    count: number | undefined;
}
