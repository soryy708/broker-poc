import express from 'express';
import errorMiddleware from '../middleware/error';

const router = express.Router();

router.get('/', (_req, res) => {
    res.status(200).send('Hello world');
});

router.use(errorMiddleware);

export default router;
