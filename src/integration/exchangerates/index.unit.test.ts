import { strict as assert } from 'assert';
import sinon from 'sinon';
import axios from 'axios';
import exchangeRates from '.';

describe('integration', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe('exchangeRates', () => {
        describe('getLatestRates', () => {
            it('Correctly converts from Euro', async () => {
                sinon.stub(axios, 'get').resolves({
                    data: {
                        rates: {
                            USD: 0.5,
                            ILS: 3.5,
                        },
                    },
                });

                const actual = await exchangeRates.getLatestRates('ILS');

                assert.strictEqual(actual, 7);
            });
        });
    });
});
