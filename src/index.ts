import expressServer from './express';
import { init as initDb } from './db';

void initDb();
expressServer.init();

process
    .on('unhandledRejection', (exception: Error) => {
        console.error('Unhandled rejection at Promise', exception.stack);
    })
    .on('uncaughtException', (exception: Error) => {
        console.error('Unhandled exception thrown', exception.stack);
    });
