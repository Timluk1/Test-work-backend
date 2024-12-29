import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Feedback } from "./feedback.entity";
import { Upvotes } from "./upvotes.entity";

@Entity()
export class User {
    // колонки таблицы users
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    // связь с таблицей фидбеков
    @OneToMany(() => Feedback, feedback => feedback.user) 
    feedbacks!: Feedback[];

    @OneToMany(() => Upvotes, upvote => upvote.user) 
    upvotes!: Upvotes[];
}
