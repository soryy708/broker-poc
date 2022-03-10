import expressServer from './express';

expressServer.init();

process
    .on('unhandledRejection', (exception: Error) => {
        console.error('Unhandled rejection at Promise', exception.stack);
    })
    .on('uncaughtException', (exception: Error) => {
        console.error('Unhandled exception thrown', exception.stack);
    });
