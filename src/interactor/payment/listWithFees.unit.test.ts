import { strict as assert } from 'assert';
import listWithFees from './listWithFees';
import paymentEntityGateway from '../../entityGateway/payment';
import config from '../../config';
import sinon from 'sinon';
import exchangeRates from '../../integration/exchangerates';

describe('interactor', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('payment', () => {
        describe('listWithFees', () => {
            it('Returns empty array if no payments', async () => {
                sinon.stub(paymentEntityGateway, 'findAll').resolves([]);
                const result = await listWithFees();

                const actual = result.data;
                assert.ok(actual);
                assert.strictEqual(actual.length, 0);
            });

            it('Maps the payment', async () => {
                const id = 'id';
                sinon.stub(paymentEntityGateway, 'findAll').resolves([{ amount: 0, transactionFee: 0, id }] as any);

                const result = await listWithFees();

                const actual = result.data;
                assert.ok(actual);
                assert.strictEqual(actual.length, 1);
                assert.strictEqual(actual[0].id, id);
            });

            it('Maps both payments', async () => {
                const id1 = 'id1';
                const id2 = 'id2';
                sinon.stub(paymentEntityGateway, 'findAll').resolves([
                    { amount: 0, transactionFee: 0, id: id1 },
                    { amount: 0, transactionFee: 0, id: id2 },
                ] as any);

                const result = await listWithFees();

                const actual = result.data;
                assert.ok(actual);
                assert.strictEqual(actual.length, 2);
                assert.strictEqual(actual[0].id, id1);
                assert.strictEqual(actual[1].id, id2);
            });

            it('Calculates brokerFee correctly', async () => {
                sinon.stub(paymentEntityGateway, 'findAll').resolves([{ amount: 100, transactionFee: 0.01 }] as any);
                sinon.stub(config, 'get').returns({ brokerFee: 0.003 } as any);

                const result = await listWithFees();

                const actual = result.data;
                assert.ok(actual);
                assert.strictEqual(actual.length, 1);
                assert.strictEqual(actual[0].brokerFee, 0.3);
            });

            it('Calculates marketplaceFee correctly', async () => {
                sinon.stub(paymentEntityGateway, 'findAll').resolves([{ amount: 100, transactionFee: 0.01 }] as any);
                sinon.stub(config, 'get').returns({ brokerFee: 0.003 } as any);

                const result = await listWithFees();

                const actual = result.data;
                assert.ok(actual);
                assert.strictEqual(actual.length, 1);
                assert.strictEqual(actual[0].marketplaceFee, 0.7);
            });

            it('Calculates vendorGets correctly', async () => {
                sinon.stub(paymentEntityGateway, 'findAll').resolves([{ amount: 100, transactionFee: 0.01 }] as any);
                sinon.stub(config, 'get').returns({ brokerFee: 0.003 } as any);

                const result = await listWithFees();

                const actual = result.data;
                assert.ok(actual);
                assert.strictEqual(actual.length, 1);
                assert.strictEqual(actual[0].vendorGets, 99);
            });

            it('Converts currency correctly', async () => {
                const amount = 100;
                const exchangeRate = 0.5;
                sinon.stub(paymentEntityGateway, 'findAll').resolves([{ amount, transactionFee: 0.01 }] as any);
                sinon.stub(exchangeRates, 'getLatestRates').resolves(exchangeRate);
                sinon.stub(config, 'get').returns({ brokerFee: 0.003 } as any);

                const result = await listWithFees('notUSD');

                const actual = result.data;
                assert.ok(actual);
                assert.strictEqual(actual.length, 1);
                assert.strictEqual(actual[0].amount, amount * exchangeRate);
                assert.strictEqual(actual[0].brokerFee, 0.3 * exchangeRate);
                assert.strictEqual(actual[0].marketplaceFee, 0.7 * exchangeRate);
                assert.strictEqual(actual[0].vendorGets, 99 * exchangeRate);
            });
        });
    });
});
