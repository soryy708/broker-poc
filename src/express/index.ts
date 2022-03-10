import express from 'express';
import routes from './routes';

const port = 3000;

function init(): void {
    const app = express();
    app.use(express.json());
    app.use(routes);
    app.listen(port, () => console.log('Now listening on port', port));
}

export default { init };
