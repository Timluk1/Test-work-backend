import { Entity, PrimaryGeneratedColumn, Column, getRepository } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column()
    email!: string

    @Column()
    password!: string
}
