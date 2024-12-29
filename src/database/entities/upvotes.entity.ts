import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    Column,
} from "typeorm";
import { User } from "./user.entity";
import { Feedback } from "./feedback.entity";

@Entity()
export class Upvotes {
    // колонки таблицы upvotes
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ default: true })
    isLike!: boolean;

    // связи с другими таблицами
    @ManyToOne(() => User, (user: User) => user.upvotes)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @ManyToOne(() => Feedback, (feedbacks: Feedback) => feedbacks.upvotes)
    @JoinColumn({ name: "feedback_id" })
    feedback!: Feedback;
}
