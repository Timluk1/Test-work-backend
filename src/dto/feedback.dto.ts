import { Category, Status, User } from "../database/entities";

export interface IFeedbackDto {
    title: string;
    description: string;
    category_id: string; 
    status_id: string;   
}

export interface IFeedbackCreate {
    user: User; 
    title: string;
    description: string;
    category_id: string; 
    status_id: string;  
}

export interface IFeedbackRepository {
    title: string;
    description: string;
    category: Category; 
    status: Status;   
    user: User;         
}

export interface IRequestDelete {
    id: string; 
}

export interface IRequestGetFeedbacks {
    count?: number; 
}
