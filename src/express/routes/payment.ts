import express from 'express';
import asyncWrapper from '../util/asyncWrapper';
import { handleInteractorResult } from '../../interactor';
import paymentInteractor from '../../interactor/payment';
import { AcceptSuccess } from '../../interactor/payment/accept';
import validation from '../../util/validation';

const router = express.Router();

router.post(
    '/',
    asyncWrapper(async (req, res) => {
        console.log(req.body);
        const { buyerId, amount, transactionFee } = req.body;

        if (!validation.exists(buyerId) || !validation.isUuid(buyerId)) {
            res.status(400).send('validation/buyerId');
            return;
        }
        if (!validation.exists(amount) || !validation.isNumber(amount)) {
            res.status(400).send('validation/amount');
            return;
        }
        if (validation.exists(transactionFee) && !validation.isNumber(transactionFee)) {
            res.status(400).send('validation/transactionFee');
            return;
        }

        const result = await paymentInteractor.accept(buyerId, amount, transactionFee);
        handleInteractorResult<AcceptSuccess, never>(
            result,
            () => {
                res.status(200).send();
            },
            () => {
                res.status(500).send();
            }
        );
    })
);

export default router;
