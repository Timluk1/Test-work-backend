import morgan from "morgan"
import { Express } from "express"
import { userRouter } from "../routes/user";
import { urlencoded, json } from "express";
import { errorMiddleware } from "./error.middleware";

const initAllRoutes = (app: Express) => {
    app.use("/api", userRouter);
}

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
}