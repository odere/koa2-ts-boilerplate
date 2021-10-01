// Load APM on production environment
import App from './app';
import config from './config';
import logger from './logger';

const app = new App();

type SIGNAL = 'SIGTERM' | 'SIGINT' | 'SIGUSR2';

export function handleError(err: Error, ctx: unknown): void {
  if (ctx === null) {
    logger.error({ err, event: 'error' }, 'Unhandled exception occured');
  }
}

export function terminate(signal: SIGNAL): void {
  try {
    app.terminate();
  } finally {
    logger.info({ signal, event: 'terminate' }, 'App is terminated');
    process.kill(process.pid, signal);
  }
}

// Handle uncaught errors
app.on('error', handleError);

export const main = (): void => {
  const { port, host, env } = config;
  const server = app.listen(port, host, () => {
    logger.info(
      { event: 'execute' },
      `API server listening on http://${host}:${port}, in ${env}`
    );
  });

  server.on('error', handleError);

  const errors = ['unhandledRejection', 'uncaughtException'];
  errors.forEach((error) => {
    process.on(error, handleError);
  });

  const signals: SIGNAL[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
  signals.forEach((signal) => {
    process.once(signal, () => terminate(signal));
  });
};

main();

export default app;
