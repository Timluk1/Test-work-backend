import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { User } from "./user.entity";
import { Category } from "./category.entity";
import { Status } from "./status.entity";
import { Upvotes } from "./upvotes.entity";

@Entity()
export class Feedback {
    // колонки таблицы feedbacks
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @CreateDateColumn({
        name: "created_at",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    created_at!: Date;

    @UpdateDateColumn({
        name: "updated_at",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    })
    updated_at!: Date;

    // связи с другими таблицами
    @ManyToOne(() => User, (user: User) => user.feedbacks)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @ManyToOne(() => Category, (category: Category) => category.feedbacks, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "category_id" })
    category!: Category;

    @ManyToOne(() => Status, (status: Status) => status.feedbacks, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "status_id" })
    status!: Status;

    @OneToMany(() => Upvotes, (upvote: Upvotes) => upvote.feedback, {
        onDelete: "CASCADE",
    })
    upvotes!: Upvotes[];
}
