import { strict as assert } from 'assert';
import create from './create';
import useTestDb from '../../db/test';

describe('entityGateway', () => {
    describe('payment', () => {
        describe('create', () => {
            it('Creates a payment', async () => {
                await useTestDb(async db => {
                    const buyerId = 'buyerId';
                    const amount = 1;
                    const transactionFee = 2;

                    await create({ buyerId, amount, transactionFee }, { db });

                    const payment = await db.models.payment.findOne();
                    assert.ok(payment);
                });
            });

            it('Returns payment id', async () => {
                await useTestDb(async db => {
                    const buyerId = 'buyerId';
                    const amount = 1;
                    const transactionFee = 2;

                    const id = await create({ buyerId, amount, transactionFee }, { db });

                    assert.ok(id);
                    const payment = await db.models.payment.findOne();
                    assert.strictEqual(payment.id, id);
                });
            });

            it('Saves buyerId', async () => {
                await useTestDb(async db => {
                    const buyerId = 'buyerId';
                    const amount = 1;
                    const transactionFee = 2;

                    await create({ buyerId, amount, transactionFee }, { db });

                    const payment = await db.models.payment.findOne();
                    assert.strictEqual(payment.buyerId, buyerId);
                });
            });

            it('Saves amount', async () => {
                await useTestDb(async db => {
                    const buyerId = 'buyerId';
                    const amount = 1;
                    const transactionFee = 2;

                    await create({ buyerId, amount, transactionFee }, { db });

                    const payment = await db.models.payment.findOne();
                    assert.strictEqual(payment.amount, amount);
                });
            });

            it('Saves transactionFee', async () => {
                await useTestDb(async db => {
                    const buyerId = 'buyerId';
                    const amount = 1;
                    const transactionFee = 2;

                    await create({ buyerId, amount, transactionFee }, { db });

                    const payment = await db.models.payment.findOne();
                    assert.strictEqual(payment.transactionFee, transactionFee);
                });
            });
        });
    });
});
