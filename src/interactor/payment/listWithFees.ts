import { ResultBoundary } from '..';
import paymentEntityGateway from '../../entityGateway/payment';
import { IPayment } from '../../types/payment';
import config from '../../config';

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

async function listWithFees(): Promise<ListWithFeesSuccess> {
    const payments = await paymentEntityGateway.findAll();
    return new ListWithFeesSuccess(
        payments.map(payment => {
            const brokerFee = payment.amount * config.get().brokerFee;
            const marketplaceFee = payment.amount * payment.transactionFee - brokerFee;
            const vendorGets = payment.amount - brokerFee - marketplaceFee;
            return {
                id: payment.id,
                buyerId: payment.buyerId,
                amount: payment.amount,
                transactionFee: payment.transactionFee,
                marketplaceFee,
                brokerFee,
                vendorGets,
            };
        })
    );
}

export default listWithFees;
