import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Feedback } from "./feedback.entity";

@Entity()
export class Category {
    // Коллонки таблицы категорий
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    name!: string;

    // Связь с таблицей отзывов
    @OneToMany(() => Feedback, (feedback: Feedback) => feedback.category)
    feedbacks!: Feedback[];
}
