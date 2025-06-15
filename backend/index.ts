import './src/tracing';
import app from './src/routes';
import logger from './src/logger';

const port = process.env.PORT || 8080;

// Start the server
app.listen(port, () => logger.info(`Server running on http://localhost:${port}`));
