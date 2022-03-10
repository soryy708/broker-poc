import { ResultBoundary } from '..';
import paymentEntityGateway from '../../entityGateway/payment';
import { IPayment } from '../../types/payment';
import config from '../../config';
import exchangeRates from '../../integration/exchangerates';

type ListWithFeesData = (IPayment & {
    marketplaceFee: number;
    brokerFee: number;
    vendorGets: number;
})[];

export class ListWithFeesSuccess implements ResultBoundary {
    success = true;
    data: ListWithFeesData;
    constructor(data: ListWithFeesData) {
        this.data = data;
    }
}

async function listWithFees(currency = 'USD'): Promise<ListWithFeesSuccess> {
    const [payments, exchangeRate] = await Promise.all([
        paymentEntityGateway.findAll(),
        currency === 'USD' ? 1 : await exchangeRates.getLatestRates(currency),
    ]);
    return new ListWithFeesSuccess(
        payments.map(payment => {
            const paymentAmount = payment.amount * exchangeRate;
            const brokerFee = paymentAmount * config.get().brokerFee;
            const marketplaceFee = paymentAmount * payment.transactionFee - brokerFee;
            const vendorGets = paymentAmount - brokerFee - marketplaceFee;
            return {
                id: payment.id,
                buyerId: payment.buyerId,
                amount: paymentAmount,
                transactionFee: payment.transactionFee,
                marketplaceFee,
                brokerFee,
                vendorGets,
            };
        })
    );
}

export default listWithFees;
