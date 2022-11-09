import winston from "winston";
import chalk from "chalk";

const myFormat = winston.format.printf(({ level, message, timestamp, context, ...metadata }) => {
    let msg = `=> ${chalk.bgWhite.bold.black(` ${context} `)} | ${chalk.bold.blueBright(
        timestamp,
    )} | [${chalk.bold.blueBright(level)}] : ${chalk.greenBright(message)} `;
    if (metadata && Object.keys(metadata).length > 0) {
        msg += JSON.stringify(metadata);
    }
    return msg;
});

export const winstonLogger = (context: string = "Application") => {
    const appLogger = winston.createLogger({
        defaultMeta: { context: context },
        transports: [new winston.transports.Console()],
        format: winston.format.combine(winston.format.splat(), winston.format.timestamp(), myFormat),
    });
    return appLogger;
};

export enum WinstonLogLevels {
    ERROR = "error",
    WARN = "warn",
    INFO = "info",
    HTTP = "http",
    VERBOSE = "verbose",
    DEBUG = "debug",
    SILLY = "silly",
}

export const logger = (
    message: string,
    context: string = "application",
    level: WinstonLogLevels = WinstonLogLevels.INFO,
) => {
    context = context.toUpperCase();
    return winstonLogger(context).log({ level: level, message: message });
};
