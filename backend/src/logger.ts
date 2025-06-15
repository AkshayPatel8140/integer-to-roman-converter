import winston from "winston"
import fs from 'fs';
import path from 'path';
import { context, trace, SpanStatusCode } from "@opentelemetry/api";

const logDir = '../backend/logs';
fs.mkdirSync(logDir, { recursive: true });

// Custom format to include trace information in the logs
const traceFormat = winston.format((info) => {
    const span = trace.getSpan(context.active());
    if (span) {
        const spanContext = span.spanContext();
        info.trace_id = spanContext.traceId;
        info.span_id = spanContext.spanId;
        info.trace_flags = spanContext.traceFlags?.toString(16).padStart(2, '0');
    }
    return info;
});

// This file sets up a logger using the winston library.
const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        traceFormat(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),                                               // Log to the console
        new winston.transports.File({ filename: path.join(logDir, 'combined.log') }),   // Log to a file
    ]
});

export default logger
