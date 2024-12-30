import { DataSource } from "typeorm";
import { User, Feedback, Status, Category, Upvotes } from "./entities";
import "dotenv/config";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "database",
    port: Number(process.env.POSTGRES_PORT),
    username: String(process.env.POSTRGRES_USERNAME),
    password: String(process.env.POSTGRES_PASSWORD),
    database: String(process.env.POSTGRES_DATABASE),
    synchronize: true,
    logging: false,
    entities: [User, Feedback, Status, Category, Upvotes],
    subscribers: [],
    migrations: [],
});
