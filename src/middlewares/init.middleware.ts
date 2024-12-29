import morgan from "morgan";
import { Express } from "express";
import { userRouter } from "../routes/user";
import { feedbackRouter } from "../routes/feedback";
import { categoryRouter } from "../routes/category";
import { statusRouter } from "../routes/status";
import { urlencoded, json } from "express";
import { errorMiddleware } from "./error.middleware";
import { checkAuthMiddleware } from "./auth.middleware";
import { upvotesRouter } from "../routes/upvotes";

const initAllRoutes = (app: Express) => {
    // роуты для работы с пользователем и авторизации
    app.use("/api", userRouter);
    // роуты для создания фидбеков защищены токеном
    app.use("/api", checkAuthMiddleware, feedbackRouter);
    // роуты для работы с категориями защищены токеном
    app.use("/api", checkAuthMiddleware, categoryRouter);
    // роуты для работы с реакциями защищены токеном
    app.use("/api", checkAuthMiddleware, upvotesRouter);
    // роуты для работы со статусами защищены токеном
    app.use("/api", checkAuthMiddleware, statusRouter);
};

export const init = (app: Express) => {
    // json middleware
    app.use(json());
    app.use(urlencoded({ extended: true }));
    // morgan middleware
    app.use(morgan(process.env.TYPE_ENVIROMENT as string));
    // init all routes
    initAllRoutes(app);
    // init error handling
    app.use(errorMiddleware);
};
