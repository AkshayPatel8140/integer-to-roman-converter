import request from 'supertest';
import app from '../src/routes';


describe('API Endpoints', () => {
    it('GET / should return welcome message', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.text).toMatch(/Welcome to the Roman numeral converter API! Use '...\/romannumeral\?query=<number>' to convert a number to Roman numeral./);
    });

    it('GET /metrics should return metrics format', async () => {
        const res = await request(app).get('/metrics');
        expect(res.status).toBe(200);
        expect(res.text).toMatch(/# HELP requests_total/);
    });

    it('GET /romannumeral with valid input with value 14, should return correct Roman numeral', async () => {
        const res = await request(app).get('/romannumeral?query=14');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            input: "14",
            output: "XIV",
            message: "Roman numeral conversion successful"
        });
    });

    it('GET /romannumeral with empty query, should return 400 error', async () => {
        const res = await request(app).get('/romannumeral');
        expect(res.status).toBe(400);
        expect(res.text).toMatch(/Invalid query parameter/);
    });

    it('GET /romannumeral with out-of-range number, should return 400 error', async () => {
        const res = await request(app).get('/romannumeral?query=4000');
        expect(res.status).toBe(400);
        expect(res.text).toMatch(/Invalid query parameter Please provide a number between 1 and 3999./);
    });

    it('GET /romannumeral with invalid string input, should return 400 error', async () => {
        const res = await request(app).get('/romannumeral?query=abc');
        expect(res.status).toBe(400);
        expect(res.text).toMatch(/Invalid query parameter Please provide a number between 1 and 3999./);
    });
});