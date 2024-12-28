import winston from "winston";

const logLevels = {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
};

// Настраиваем winston
export const logger = winston.createLogger({
    level: "info",
    levels: logLevels,
    format: winston.format.cli(),
    transports: [new winston.transports.Console()],
});
