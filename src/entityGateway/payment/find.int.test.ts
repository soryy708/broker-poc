import { strict as assert } from 'assert';
import find from './find';
import useTestDb from '../../db/test';

describe('entityGateway', () => {
    describe('payment', () => {
        describe('find', () => {
            it('Returns null if not found', async () => {
                await useTestDb(async db => {
                    const actual = await find('', { db });
                    assert.strictEqual(actual, null);
                });
            });

            it('Returns the payment', async () => {
                await useTestDb(async db => {
                    const payment = await db.models.payment.create({ amount: 0, transactionFee: 0, buyerId: '' });
                    const actual = await find(payment.id, { db });
                    assert.ok(actual);
                });
            });

            it("Doesn't return other payment", async () => {
                await useTestDb(async db => {
                    await db.models.payment.create({ amount: 0, transactionFee: 0, buyerId: '' });
                    const actual = await find('', { db });
                    assert.strictEqual(actual, null);
                });
            });
        });
    });
});
