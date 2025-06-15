import { Request, Response, NextFunction } from "express";
import client from 'prom-client';

client.collectDefaultMetrics();

// It use to track the number of requests.
const counter = new client.Counter({
    name: "requests_total",
    help: "Total number of requests"
})

// This use to count for failed requests
const errorCounter = new client.Counter({
    name: "requests_errors_total",
    help: "Total number of failed requests"
});

// This middleware increments the request counter for each incoming request
const middlewareMetrics = (_req: Request, res: Response, next: NextFunction) => {

    // Increment the counter for all requests except for the /metrics endpoint and root path
    if (_req.path !== '/metrics' && _req.path !== '/') {
        counter.inc();
        res.on('finish', () => {
            if (res.statusCode >= 400) {
                errorCounter.inc();
            }
        });
    }
    next();
}

// This endpoint returns the current metrics in Prometheus format
const endpointMetrics = async (_req: Request, res: Response) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
};

export { middlewareMetrics, endpointMetrics, counter, errorCounter };