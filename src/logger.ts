import { LogLevel, createLogger, stdSerializers, Stream } from 'bunyan';
import PrettyStream = require('bunyan-prettystream');

const getPrettyStream = (): Stream => {
  const prettyStdOut = new PrettyStream();
  prettyStdOut.pipe(process.stdout);

  return {
    level: (process.env.LOG_LEVEL as LogLevel) || 'trace',
    stream: prettyStdOut,
  };
};

const logger = createLogger({
  name: 'koa2-ts-boilerplate',
  serializers: stdSerializers,
  streams: [getPrettyStream()],
});

export default logger;
