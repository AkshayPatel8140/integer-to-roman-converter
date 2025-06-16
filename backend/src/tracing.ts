import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import logger from './logger';

const resource = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: 'adobe-task-backend-api',
  [ATTR_SERVICE_VERSION]: '1.0.0',
});

// You can replace ConsoleSpanExporter with any other exporter as needed
// For example, you can use Jaeger, Zipkin, or any other exporter supported by OpenTelemetry
const traceExporter = new ConsoleSpanExporter();

// Initialize the OpenTelemetry SDK with the resource and exporters
const sdk = new NodeSDK({
  resource: resource,
  traceExporter: traceExporter,
  instrumentations: [getNodeAutoInstrumentations()]
});

// Start the SDK to begin tracing
try {
  sdk.start();
  logger.info('Tracing initialized');
} catch (err) {
  logger.error('Error initializing tracing', err);
}

// gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => logger.info('Tracing terminated'))
    .catch((error) => logger.error('Error terminating tracing', error))
    .finally(() => process.exit(0));
});