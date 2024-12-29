import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Feedback } from "./feedback.entity";

@Entity()
export class Status {
    // Колонки таблицы статусов
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    // Связь с таблицей фидбеков
    @OneToMany(() => Feedback, (feedback: Feedback) => feedback.status)
    feedbacks!: Feedback[];
}
