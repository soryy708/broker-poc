import { strict as assert } from 'assert';
import findAll from './findAll';
import useTestDb from '../../db/test';

describe('entityGateway', () => {
    describe('payment', () => {
        describe('findAll', () => {
            it('Returns empty array if no payments', async () => {
                await useTestDb(async db => {
                    const actual = await findAll({ db });
                    assert.ok(actual);
                    assert.strictEqual(actual.length, 0);
                });
            });

            it('Returns array with payment', async () => {
                await useTestDb(async db => {
                    const payment = await db.models.payment.create({ amount: 0, transactionFee: 0, buyerId: '' });
                    const actual = await findAll({ db });
                    assert.strictEqual(actual.length, 1);
                    assert.strictEqual(actual[0].id, payment.id);
                });
            });

            it('Returns both payments', async () => {
                await useTestDb(async db => {
                    const payment1 = await db.models.payment.create({ amount: 0, transactionFee: 0, buyerId: '' });
                    const payment2 = await db.models.payment.create({ amount: 0, transactionFee: 0, buyerId: '' });
                    const actual = await findAll({ db });
                    assert.strictEqual(actual.length, 2);
                    assert.strictEqual(actual[0].id, payment1.id);
                    assert.strictEqual(actual[1].id, payment2.id);
                });
            });
        });
    });
});
