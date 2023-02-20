# Ocignis Bot

[![CI][ci-badge]][ci-url]
[![CI-Deployment][ci-deployment-badge]][ci-deployment-url]

Minimal trading bot with API to easily run, stop or schedule trading strategies. Built algorithms in Typescript with focus on best practices and painless developer experience.

## Features:

- Minimal setup that can be extended 🔧
- Spin it up with single command 🌀
- Dockerized - Instantly create multiple bot containers with different strategies parameters ⚡
- End-To-End type safety with TypeScript (Database <-> Bot <-> API <-> Frontend)
- tRPC API for seamless [frontend app](https://github.com/ocignis/ocignis-fe) integration
- Optional Express.js REST API
- Websocket implementation. Get every single trade in real time.
- Implemented with Binance integration, but extendable for any crypto or stock exchange

## Requirements

- [Node v18+](https://nodejs.org/)
- [Docker](https://www.docker.com/)

## Running

_Easily set up a local development environment with single command!_

- clone the repo
- `npm run dev` 🚀

Visit [localhost:4000](http://localhost:4000/)

Tech Stack:

- [Prisma v4](https://www.prisma.io/) ORM
- [TypeScript v4](https://github.com/microsoft/TypeScript) codebase with [Strict Configuration](https://typescript-eslint.io/docs/linting/configs#strict)
- [tRPC](https://trpc.io/) API for client integration.
- Unit and integration tests with [Jest](https://github.com/facebook/jest)
- Linting with [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/) code formatter
- Git hooks with [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- Commit messages must meet [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) format.  
  After staging changes just run `npm run commit` and get instant feedback on your commit message formatting and be prompted for required fields by [Commitizen](https://github.com/commitizen/cz-cli)

<!-- Badges -->

[ci-badge]: https://github.com/ocignis/ocignis-bot-and-api/actions/workflows/CI.yml/badge.svg
[ci-url]: https://github.com/ocignis/ocignis-bot-and-api/actions/workflows/CI.yml
[ci-deployment-badge]: https://github.com/ocignis/ocignis-bot-and-api/actions/workflows/CI-Deployment.yml/badge.svg
[ci-deployment-url]: https://github.com/ocignis/ocignis-bot-and-api/actions/workflows/CI-Deployment.yml
