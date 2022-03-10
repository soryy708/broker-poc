import express from 'express';
import errorMiddleware from '../middleware/error';
import paymentRouter from './payment';

const router = express.Router();

router.use('/payment', paymentRouter);

router.use(errorMiddleware);

export default router;
