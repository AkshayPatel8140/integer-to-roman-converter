import express, { Request, Response } from 'express';
import { toRoman } from './converter';
import { middlewareMetrics, endpointMetrics } from './observability';
import logger from './logger';
import cors from 'cors';

// This is the main entry point for the Roman numeral converter API.
const app = express();

// This allows the API to be accessed from different origins, which is useful for frontend applications.
app.use(cors());

// This middleware is used to log incoming requests and track metrics.
app.use(middlewareMetrics);

// define the port for the API to listen on
app.get('/', (req: Request, res: Response) => {
    logger.info('Received request for root endpoint');
    res.status(200).send(`Welcome to the Roman numeral converter API! Use '.../romannumeral?query=<number>' to convert a number to Roman numeral.`);
});

// This endpoint returns the current metrics of the API, such as the total number of requests.
app.get('/metrics', endpointMetrics);

// This endpoint converts a number to its Roman numeral representation.
app.get('/romannumeral', (req: any, res: any) => {

    logger.info('Received request for Roman numeral conversion');

    const query = req.query.query;
    const num = Number(query);

    // Validate the input to ensure it's a number between 1 and 3999
    if (!query || isNaN(num) || num < 1 || num > 3999) {

        logger.error(`Invalid input for Roman numeral conversion : ${query}`);

        // Return a 400 Bad Request response with an direct error message
        return res.status(400).send('Invalid query parameter Please provide a number between 1 and 3999.');
    }

    // Convert the number to Roman numeral
    const output = toRoman(num);
    logger.info(`Converted ${num} => Roman numeral: ${output}`);

    // Return the result as a JSON response
    res.status(200).json({
        input: num.toString(),
        output: output,
        message: 'Roman numeral conversion successful'
    });
})

export default app;