import { strict as assert } from 'assert';
import asyncWrapper, { IMockRequest, IMockResponse } from '.';

class MockRequest implements IMockRequest {}

class MockResponse implements IMockResponse {}

describe('asyncWrapper', () => {
    it('Calls callback', done => {
        const req = new MockRequest();
        const res = new MockResponse();
        const next = () => {};
        void asyncWrapper((inReq, inRes, inNext) => {
            try {
                assert.strictEqual(inReq, req);
                assert.strictEqual(inRes, res);
                assert.strictEqual(inNext, next);
                done();
                return Promise.resolve();
            } catch (err) {
                done(err);
                return Promise.reject(err);
            }
        })(req, res, next);
    });

    it('Calls `next` with error if exception is thrown in callback', done => {
        const error = new Error('Testing error');
        void asyncWrapper(() => {
            throw error;
        })(new MockRequest(), new MockResponse(), (inErr: any) => {
            try {
                assert.strictEqual(inErr, error);
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    it('Calls `next` with error if promise returned by callback rejects', done => {
        const error = new Error('Testing error');
        void asyncWrapper(() => {
            return Promise.reject(error);
        })(new MockRequest(), new MockResponse(), (inErr: any) => {
            try {
                assert.strictEqual(inErr, error);
                done();
            } catch (err) {
                done(err);
            }
        });
    });
});
