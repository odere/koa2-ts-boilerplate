# KOA2 TypeScript Boilerplate

A NodeJS API service built with the KOA2 framework using TypeScript.
POC, service is used to store feedback data. (Currently to the google sheets)
[Google Console](https://console.cloud.google.com/iam-admin/settings?project=ab-user-feedback)

Technologies Used:

- [KOA2](http://koajs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [Nodemon](https://nodemon.io/)
- [Docker](https://www.docker.com/)
- [Swagger](https://swagger.io/)
- [Bunyahn](https://github.com/trentm/node-bunyan)

## Prerequisites

- NVM [nvm](https://github.com/creationix/nvm)
- Node.js (16+): recommend using [nvm](https://github.com/creationix/nvm)
- Docker (if building a docker image) <https://www.docker.com/docker-mac>

## Installation

1. clone project `git clone https://github.schibsted.io/ab/user-feedback`
1. `cd` into the main directory
1. `nvm use` set up correct Node version
1. `npm install` install dependencies

## Development

During development, the `/app` folder is being watched for changes.

All changes invoke the TypeScript compiler, which restarts the app upon completion.

```shell
npm run dev:watch
```

## Build the Server

To compile the TypeScript code and place into the `/dist` folder:

```shell
npm build
```

## Start the Server

To compile the TypeScript code and place into the `/dist` folder:

```shell
npm build && npm start
```

## Code Linter

A TypeScript linter has been added to keep code consistent among developers.

```shell
npm run lint
```

To autofix linting errors (not all errors are auto-fixable):

```shell
npm run fix
```

## Tests

For TDD, invoke testing by:

```shell
npm run test
```

## Nuke generated files files

For TDD, invoke testing by:

```shell
npm run clear
```

## Docker

To build a container using the `Dockerfile`:

```shell
docker build --force-rm -t koa2-ts-boilerplate .
```

To run a container using the `dockerfile`:

```shell
docker run --rm -ti -p 3000 --env HOST=${HOST} koa2-ts-boilerplate
```
