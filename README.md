# Integer to Roman Converter

This project is a Roman numeral converter built, It includes:
- A backend API built with Node.js + Express
- A frontend UI built with React + Adobe React Spectrum
- Dockerized setup for local development
- Observability via metrics and logging

## Backed
- Endpoint: `http://localhost:8080/romannumeral?query={integer}`
- Input: Integer between => 1 – 3999
- Success Response: 
  ```json
  { "input": "23", "output": "XXIII" }
  ```
- Error Response: Plain text message
    ``` json
    Invalid query parameter. Please provide a number between 1 and 3999.
    ```

## Running with Docker
``` base
docker-compose up --build
```

## Observability
- Logging via Winston
- Metrics exposed at `/metrics`