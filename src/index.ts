import express from "express";
import { logger } from "./lib/logger";
import { init } from "./middlewares/init.middleware";
import { AppDataSource } from "./database/init";
import "dotenv/config";

const main = () => {
    // Функция для инициализации и запуска приложения
    const port = process.env.EXPRESS_PORT || 3000; // Значение по умолчанию, если не указано
    const app = express();

    // Регистрируем все middleware
    init(app);

    // Инициализация подключения к БД
    AppDataSource.initialize()
        .then(() => {
            logger.info("Database connected");
        })
        .catch((err) => {
            console.log(err)
            logger.error("Database connection error", err.message);
        });

    // Запуск сервера
    app.listen(port, () => {
        logger.info(`Server started on port: ${port}`);
    });
};

main();
