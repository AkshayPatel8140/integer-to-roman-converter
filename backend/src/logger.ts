import winston from "winston"

// This file sets up a logger using the winston library.
const logger = winston.createLogger({
    level: "info",
    transports: [new winston.transports.Console()],
})

export default logger