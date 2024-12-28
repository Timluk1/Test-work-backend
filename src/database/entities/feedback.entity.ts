import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Feedback {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    title!: string;

    @ManyToOne(() => User, (user: User) => user.feedbacks)
    @JoinColumn({ name: "user_id" }) 
    user!: User;

    @Column()
    description!: string;

    @Column()
    created_at!: Date;

    @Column()
    updated_at!: Date;
}
