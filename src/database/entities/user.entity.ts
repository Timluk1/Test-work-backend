import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Feedback } from "./feedback.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @OneToMany(() => Feedback, feedback => feedback.user) // Связь один ко многим с Feedback
    feedbacks!: Feedback[];
}
