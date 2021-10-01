import cors = require('@koa/cors');
import koaBody = require('koa-body');
import koaBunyanLogger = require('koa-bunyan-logger');
import serve = require('koa-static');
import Koa from 'koa';
import { Server } from 'http';

import errorHadler from './middlewares/error-hendler';
import initData from './middlewares/init-data';
import { routes } from './routes';
import logger from './logger';

export interface AppOptions {
  env?: string;
  keys?: string[];
  proxy?: boolean;
  subdomainOffset?: number;
  proxyIpHeader?: string;
  maxIpsCount?: number;
}

export default class App extends Koa {
  servers: Server[];

  proxy: boolean;

  constructor(params?: AppOptions) {
    super(params);

    // Trust proxy
    this.proxy = true;

    this.servers = [];

    this.#configureMiddlewares();
    this.#configureLogger();
    this.#configureRoutes();
  }

  #configureMiddlewares(): void {
    this.use(koaBody());
    this.use(cors());
    this.use(errorHadler());
    this.use(initData());
    this.use(serve('public'));
  }

  #configureRoutes(): void {
    this.use(routes);
  }

  #configureLogger(): void {
    if (process.env.NODE_ENV !== 'test') {
      this.use(koaBunyanLogger(logger));
      this.use(koaBunyanLogger.requestLogger());
      this.use(koaBunyanLogger.timeContext());
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  listen(...args): Server {
    const server = super.listen(...args);

    this.servers.push(server);

    return server;
  }

  terminate(): void {
    this.servers.forEach((server: Server) => {
      server.close();
    });
  }
}
