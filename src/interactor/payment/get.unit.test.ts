import { strict as assert } from 'assert';
import get, { GetFailure, GetSuccess } from './get';
import paymentEntityGateway from '../../entityGateway/payment';
import sinon from 'sinon';

describe('interactor', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('payment', () => {
        describe('get', () => {
            it('Calls paymentEntityGateway.find', async () => {
                const findStub = sinon.stub(paymentEntityGateway, 'find');
                await get('');
                assert.ok(findStub.called);
            });

            it('Fails with "not found" if paymentEntityGateway.find returns null', async () => {
                sinon.stub(paymentEntityGateway, 'find').resolves(null);

                const result = await get('');

                assert.strictEqual(result.success, false);
                const failure = result as GetFailure;
                assert.strictEqual(failure.reason, 'not found');
            });

            it('Succeeds with truthy return value of paymentEntityGateway.find', async () => {
                const expected = {};
                sinon.stub(paymentEntityGateway, 'find').resolves(expected as any);

                const result = await get('');

                assert.ok(result.success);
                const success = result as GetSuccess;
                assert.strictEqual(success.data, expected);
            });
        });
    });
});
