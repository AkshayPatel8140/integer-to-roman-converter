# Integer to Roman Converter

This project is a Roman numeral converter. It includes:
- A backend API built with Node.js + Express
- A frontend UI built with React + Adobe React Spectrum
- Dockerized setup for local development
- Observability with metrics, logging, and tracing

## Observability
- Logging via Winston (logs saved in `/backend/logs`)
- Metrics exposed at `http://localhost:8080/metrics` using Prometheus format
- Tracing via OpenTelemetry + Jaeger (`http://localhost:16686`)

## Project Structure
```
.
├── backend/                  # Node.js API
│   ├── src/                  # Source files (Express, logger, tracing, routes)
│   ├── logs/                 # Winston log output
│   ├── __test__/             # Jest test files
│   └── Dockerfile            # Docker setup for backend
├── frontend/
│   ├── adobe-task-frontend/  # React app with Adobe Spectrum UI
│   │   ├── src/              # Source files (index, app, app.test, app.css)
│   │   └── Dockerfile        # Docker setup for Frontend
├── docker-compose.yml        # Docker setup for full stack
└── Report.pdf                # Project Report file
```

## Running with Docker
```bash
docker-compose up --build
```

## Ports

| Service     | Port        |
|-------------|-------------|
| Backend API | `8080`      |
| Frontend UI | `3000`      |
| Jaeger UI   | `16686`     |
| Metrics     | `/metrics`  |


## Backend
Endpoint: `http://localhost:8080/romannumeral?query={integer}`

Input: Integer between 1 and 3999
Success Response:
  ```json
  { "input": "23", "output": "XXIII" }
  ```
Error Response:
  ```json
  {"message": "Invalid query parameter. Please provide a number between 1 and 3999." }
  ```

If running locally without Docker:
```bash
cd backend
npm install
npm start
```

## Frontend
The frontend is built with React and Adobe React Spectrum.

### Running the frontend
The frontend is automatically started with Docker on `http://localhost:3000`.

If running locally without Docker:
```bash
cd frontend/adobe-task-frontend
npm install
npm start
```

### Features
- Input field for integer values
- Converts and displays Roman numeral results
- Handles and displays error responses

## Testing

To run tests with coverage:
```bash
cd frontend/adobe-task-frontend
npm run test:coverage     
```
```bash
cd backend
npm run test:coverage
```