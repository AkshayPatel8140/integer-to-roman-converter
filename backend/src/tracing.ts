import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import logger from './logger';

const resource = resourceFromAttributes({
  'service.name': 'adobe-task-backend-api',
  'service.version': '1.0.0',
});

const traceExporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces',
});

const sdk = new NodeSDK({
  resource: resource,
  traceExporter: traceExporter,
  instrumentations: [getNodeAutoInstrumentations()]
});


try {
  sdk.start();
  logger.info('Tracing initialized');
} catch (err) {
  logger.error('Error initializing tracing', err);
}
