import { strict as assert } from 'assert';
import accept from './accept';
import paymentEntityGateway from '../../entityGateway/payment';
import sinon from 'sinon';

describe('interactor', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('payment', () => {
        describe('accept', () => {
            it('Calls paymentEntityGateway.create', async () => {
                const createStub = sinon.stub(paymentEntityGateway, 'create');
                await accept('', 0);
                assert.ok(createStub.called);
            });

            it('Succeeds with the return value of paymentEntityGateway.create', async () => {
                const expected = 'foo';
                sinon.stub(paymentEntityGateway, 'create').resolves(expected);
                const result = await accept('', 0);
                const actual = result.data;
                assert.strictEqual(actual, expected);
            });
        });
    });
});
