import { ResultBoundary } from '..';
import paymentEntityGateway from '../../entityGateway/payment';
import config from '../../config';

export class AcceptSuccess implements ResultBoundary {
    success = true;
    data: string;
    constructor(data: string) {
        this.data = data;
    }
}

async function accept(
    buyerId: string,
    amount: number,
    transactionFee = config.defaultMarketplaceFee
): Promise<AcceptSuccess> {
    const paymentId = await paymentEntityGateway.create({ buyerId, amount, transactionFee });
    return new AcceptSuccess(paymentId);
}

export default accept;
