import { strict as assert } from 'assert';
import validation from '.';

describe('Validation', () => {
    describe('exists()', () => {
        ['string', '', 0, 128, [], {}, { tst: 'abc' }, new Date(), NaN].forEach(testData => {
            it(`Positive ${String(testData)}`, () => {
                assert.strictEqual(validation.exists(testData), true);
            });
        });

        [undefined, null].forEach(testData => {
            it(`Negative ${String(testData)}`, () => {
                assert.strictEqual(validation.exists(testData), false);
            });
        });
    });

    describe('isString()', () => {
        ['', ' ', 'hello', 'HELLO', '123', 'null', 'undefined', 'true', 'false'].forEach(testData => {
            it(`Positive ${testData}`, () => {
                assert.strictEqual(validation.isString(testData), true);
            });
        });

        [undefined, null, true, false, 123, 0, true, false, [], {}, new Date()].forEach(testData => {
            it(`Negative ${String(testData)}`, () => {
                assert.strictEqual(validation.isString(testData), false);
            });
        });
    });

    describe('isUuid', () => {
        [
            '00000000-0000-1000-8000-000000000000',
            '00000000-0000-2000-8000-000000000000',
            '00000000-0000-3000-8000-000000000000',
            '00000000-0000-4000-8000-000000000000',
            '00000000-0000-5000-8000-000000000000',
            '00000000-0000-1000-9000-000000000000',
            '00000000-0000-2000-9000-000000000000',
            '00000000-0000-3000-9000-000000000000',
            '00000000-0000-4000-9000-000000000000',
            '00000000-0000-5000-9000-000000000000',
            '00000000-0000-1000-a000-000000000000',
            '00000000-0000-2000-a000-000000000000',
            '00000000-0000-3000-a000-000000000000',
            '00000000-0000-4000-a000-000000000000',
            '00000000-0000-5000-a000-000000000000',
            '00000000-0000-1000-b000-000000000000',
            '00000000-0000-2000-b000-000000000000',
            '00000000-0000-3000-b000-000000000000',
            '00000000-0000-4000-b000-000000000000',
            '00000000-0000-5000-b000-000000000000',
            'cbd534fb-73a8-4359-af93-2bfea4e55154',
            'e3a2593e-6add-4e4e-b7dc-10cac83222b0',
            'c358b37b-8004-4aac-97ff-3d3844e0291e',
            'bb64a2c0-70e9-4826-858b-33368010b94b',
            'BB64A2C0-70E9-4826-858B-33368010B94B',
        ].forEach(testData => {
            it(`Positive ${testData}`, () => {
                assert.strictEqual(validation.isUuid(testData), true);
            });
        });

        [
            0,
            '0',
            1,
            '1',
            NaN,
            null,
            undefined,
            true,
            false,
            [],
            {},
            new Date(),
            '',
            'cbd534fb73a84359af932bfea4e5515',
            'cbd534fb-73a8-4359-af93-2bfea4e5515',
            'cbd534fb-73a8-4359-af93-2bfea4e551540',
            'cbd534fb-73a8-0359-af93-2bfea4e55154',
            'bb64a2c0-70e9-6826-858b-33368010b94b',
            'e3a2593e-6add-4e4e-77dc-10cac83222b0',
            'c358b37b-8004-4aac-c7ff-3d3844e0291e',
        ].forEach(testData => {
            it(`Negative ${String(testData)}`, () => {
                assert.strictEqual(validation.isUuid(testData), false);
            });
        });
    });
});
