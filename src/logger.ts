import winston, { Logger } from 'winston';

import {
  ElasticsearchTransport,
  ElasticsearchTransformer,
  TransformedData,
  LogData,
} from 'winston-elasticsearch';

function esTransformer(logData: LogData): TransformedData {
  return ElasticsearchTransformer(logData);
}

export function winstonLogger(
  esNode: string,
  name: string,
  level: string
): Logger {
  const options = {
    console: {
      level,
      handleExceptions: true,
      json: false,
      colorized: true,
    },
    es: {
      transformer: esTransformer,
      level,
      clientOpts: {
        node: esNode,
        log: level,
        maxRetries: 2,
        requestTimeout: 10000,
        sniffOnStart: false,
        auth: {
          username: 'elastic',
          password: 'admin1234',
        },
      },
    },
  };

  const esTransport: ElasticsearchTransport = new ElasticsearchTransport(
    options.es
  );

  const logger: Logger = winston.createLogger({
    exitOnError: false,
    defaultMeta: { service: name },
    transports: [esTransport, new winston.transports.Console(options.console)],
  });

  return logger;
}
