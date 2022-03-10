# Broker POC

## Build

This project uses [TypeScript](https://www.typescriptlang.org/) with very modern JavaScript features. For compatibility the source code needs to be transpiled before it can be run.

-   To build everything, run `npm run build`
-   To build production-optimized artifacts, run `npm run build-prod`
-   To automatically build when files are modified, run `npm run watch`

## Execution

-   To start the database, run `npm run start-db`
-   To start the web server, run `npm run start-dev`

Note: This command works only with the non-production build

### Environment variables

-   `EXCHANGE_RATES_API_KEY` from https://exchangeratesapi.io/pricing/

## Quality

This project utilizes automated testing of various types.

-   To run static type checking (via TypeScript), run `npm run build-dry`
-   To run static analysis (linter), run `npm run lint`
-   To run automated dynamic tests, run `npm run test`
-   To have Jest figure out what files you changed, and run only tests that touch them, run `npm run test-watch`. This will continue listening for changes and run the tests when you change files. Note: this works through git diff.
-   To measure code coverage by dynamic tests, run `npm run coverage`

## Misc

-   To enforce a consistent style, run `npm run prettier`
-   To check if style conforms to prettier configuration, run `npm run check-pretty`
