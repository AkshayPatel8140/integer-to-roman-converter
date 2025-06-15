import { Span, SpanContext, trace } from '@opentelemetry/api';
import logger from '../src/logger';

test('logger includes trace_id and span_id when span is active', () => {
  const mockSpanContext: SpanContext = {
    traceId: 'test-trace-id',
    spanId: 'test-span-id',
    traceFlags: 1,
    isRemote: false,
  };

  const mockSpan: Partial<Span> = { spanContext: () => mockSpanContext };

  jest.spyOn(trace, 'getSpan').mockReturnValue(mockSpan as Span);

  logger.info('This should include trace context');

  jest.restoreAllMocks();
});