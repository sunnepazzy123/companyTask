import winston, { LoggerOptions, format } from 'winston';

const consoleTransport = new winston.transports.Console({
    format: format.simple(),
});

const errorLogsFileTransport = new winston.transports.File({
    filename: 'error.log',
    level: 'error',
});

const allLogsFileTransport = new winston.transports.File({
    filename: 'all_logs.log',
    level: 'info',
    format: format.simple(),
});

const winstonOptions: LoggerOptions = {
    defaultMeta: { service: 'device' },
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.prettyPrint(),
        format.colorize({
            colors: {
                info: 'blue',
                error: 'red',
            },
        }),
        format.json()
    ),
    transports: [consoleTransport, errorLogsFileTransport, allLogsFileTransport],
};

const logger = winston.createLogger(winstonOptions);

export default logger;
